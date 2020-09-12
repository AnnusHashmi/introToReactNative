import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, Alert } from 'react-native';
import Animated, { Easing, onChange } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import { Button ,Checkbox} from 'react-native-paper';
import * as Google from 'expo-google-app-auth';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import * as Facebook from 'expo-facebook';
import firebase from '../../config'


import 'firebase/firestore'
import { firestore } from 'firebase';
const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat
} = Animated;
const { width, height } = Dimensions.get('window');

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position
  ]);
}

class Auth extends Component {


  constructor() {
    super();
    this.state = {
      type: ''
    }
    this.buttonOpacity = new Value(1);

    this.onStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
            )
          ])
      }
    ]);

    this.onCloseState = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
            )
          ])
      }
    ]);

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.textInputZindex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP
    });

    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP
    });

    this.textInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: Extrapolate.CLAMP
    });
  }

  componentDidMount() {
    // this.checkIfUserLoggedIn();

    firebase.auth().onAuthStateChanged(user => {
      // console.log(user,'user in auth change')
      if (user) {
        console.log(user,'userrrrr');
        var firebaseUser = firebase.auth().currentUser.uid;
        console.log("user==>",user,"and",firebaseUser,'firebase user')
        if(user.type === "actors")
          this.props.navigation.navigate('BottomNavigationActors',{user})
        else{
          this.props.navigation.navigate('BottomNavigation',{user})
        }
        }
    })
  }
  checkIfUserLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate('BottomNavigationActors')
      }
    })
  }


  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.user.id) {
          return true;
        }
      }
    }
    return false;
  }
  onSignIn = (googleUser) => {

    // console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        console.log(googleUser, firebaseUser, 'usersss')
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );
        // Sign in with credential from the Google user.
        firebase.auth().signInAndRetrieveDataWithCredential(credential)
          .then((data) => {
            console.log("thennn", data.user.uid)
            console.log(this.state.type, 'typeeee');
            firebase.firestore().collection(this.state.type).doc(data.user.uid).set({type:this.state.type,...googleUser.user})
              .then((res) => {
                if(this.state.type === 'actors'){
                  this.props.navigation.navigate('BottomNavigationActors')
                }
                else{
                  this.props.navigation.navigate('BottomNavigation')  
                }
                // this.setState({show:true,sweettext:'sucessfully Signed Up',sweettitle:'SUCCESS'})
                console.log('data added', res);
                //      this.props.history.push('/signin', this.state)
                // this.setState({ loaderclass: false })
              })
              .catch((err) => {
                Alert('Something went wrong!');
                // this.setState({show:true,sweettext:err,sweettitle:'ERROR'})
                // this.setState({ loaderclass: false })
                console.log(err);
              })
          })
          .catch(function (error) {
            console.log("error", error)
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      } else {
        var user = firebase.auth().currentUser;
        if(user.type === "actors")
          this.props.navigation.navigate('BottomNavigationActors')
        else{
          this.props.navigation.navigate('BottomNavigation')
      }
        console.log('User already signed-in Firebase.');
      }
    }.bind(this));
  }

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: '266691762359-dcpv8rgstg2tgfgt8v3ldpjq1ln8lgvc.apps.googleusercontent.com',
        behavior: 'web',
        //iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        this.onSignIn(result)



        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  //signInWithFacebook = async () => {
  //const {type , token} = await Expo.Facebook.loginWithPermissionsAsync('1252920121726022', permission : ['pubiclprofile'])
  //}

  logInWithFacebook = async () => {
    try {
      await Facebook.initializeAsync('1252920121726022');
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);

      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
  render() {

    const navigation = this.props.navigation;
    return (
      <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'flex-end' }}>

        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            transform: [{ translateY: this.bgY }]
          }}
        >
          <Image source={require('./assets/images/bg.jpg')} style={{ flex: 1, height: null, width: null }} >
          </Image>
        </Animated.View>

        <View style={{ height: height / 3, justifyContent: 'center' }}>
          
          <TouchableOpacity onPress={() => { this.setState({ type: 'business' }) }}>
            <TapGestureHandler onHandlerStateChange={this.onStateChange}>
              <Animated.View
                onPress={() => {
                  console.log("type");
                  this.setState({ type: 'business' });
                }}
                style={{
                  ...styles.button,
                  backgroundColor: '#ffa931',
                  opacity: this.buttonOpacity,
                  transform: [{ translateY: this.buttonY }]
                }}

              >
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>MEET THE BEST HERE!</Text>
              </Animated.View>
            </TapGestureHandler>
          </TouchableOpacity>


          <Animated.View style={{
            zIndex: this.textInputZindex, opacity: this.textInputOpacity,
            transform: [{ translateY: this.textInputY }], height: height / 3, ...StyleSheet.absoluteFill, top: null, justifyContent: 'center'
          }}>

            <TapGestureHandler onHandlerStateChange={this.onCloseState}>
              <Animated.View style={styles.closeButton}>
                <Animated.Text style={{
                  fontSize: 15, transform: [
                    { rotate: concat(this.rotateCross, 'deg') }
                  ]
                }}>
                  X
                        </Animated.Text>
              </Animated.View>
            </TapGestureHandler>

            <View style={{flexDirection : 'row' }}>

              <View style = {{paddingHorizontal : 45, marginBottom : 30,   }}>
                    <Checkbox
                      uncheckedColor = "#FF6347"
                      color="#FF6347"
                      status={this.state.type === 'actors' ? 'checked' : 'unchecked'}
                      onPress={() => {
                        this.setState({ type: 'actors' })
                      }}
                      
                    />
                    <Text style={{fontSize : 16}}>
                      I'm an Actor
                    </Text>
                  </View>

                  <View style = {{paddingHorizontal : 10}}>
                    <Checkbox
                    color="#FF6347"
                    uncheckedColor = "#FF6347"
                    status={this.state.type === 'business' ? 'checked' : 'unchecked'}
                    onPress={() => {
                      this.setState({ type: 'business' })
                    }}
                    />
                    <Text style={{fontSize : 16}}>I'm a Business man</Text>
                </View>
            </View>
            




            <View style={{ flexDirection: 'row', marginHorizontal : 40}}>
              <Button theme={{ colors: { primary: '#FF6347' } }} onPress={() => { this.signInWithGoogleAsync() }} icon="google" style={styles.signIn} >
                Sign In
              </Button>
              
              <Button mode="contained" onPress={() => this.logInWithFacebook()} style={styles.signIn} icon="facebook" color='#3b5998'>
                Sign In
              </Button>
            </View>

          </Animated.View>
        </View>

      </View>
    );
  }
}
export default Auth

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'white',
    height: 50,
    marginHorizontal: 25,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2
  },
  TextInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
  },
  closeButton: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    left: width / 2 - 20
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    color: "white"
  },
  btnLogin: {
    height: 40,
    borderRadius: 25,
    backgroundColor: "#cf7500",
    justifyContent: "center",
    marginLeft: 30,
    marginRight: 30
  },
  link: {
    color: 'orange'
  },
  signIn: {
    marginHorizontal: 10
  }
});