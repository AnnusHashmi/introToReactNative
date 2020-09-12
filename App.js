import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Asset} from 'expo-asset';
import {AppLoading} from 'expo'
import Auth from './screens/Auth/index';
import SignUp from './screens/Auth/signUp';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/Splash/Splash';
import BottomNavigation from './component/BottomNavigation/BottomNavigation';
import * as firebase from 'firebase';
import { firebaseConfig } from './config';
import BottomNavigationActors from './component/BottomNavigationActorsView/BottomNavigationActors'


function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

class App extends Component{

  constructor(){
    super();
    this.state = {
      isReady : false
    }
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./screens/Auth/assets/images/bg.jpg'),
    ]);

    await Promise.all([...imageAssets]);
  }

  render(){
    const Stack = createStackNavigator();

    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }


    return (
     <NavigationContainer>
        <Stack.Navigator  headerMode={"none"} initialRouteName={"SplashScreen"}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Login" component={Auth} />
            {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
            <Stack.Screen name='BottomNavigation' component={(props)=><BottomNavigation {...props} />} />
            <Stack.Screen name='BottomNavigationActors' component={(props)=><BottomNavigationActors {...props} />} />
        </Stack.Navigator>
      </NavigationContainer>
  
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;