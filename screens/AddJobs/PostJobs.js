import React, { Component } from 'react';
import { View, Text, StyleSheet, Image ,Dimensions, TextInput, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { CheckBox } from "native-base";
import signUp from './bg.jpg'
import { FAB } from 'react-native-paper';
import * as firebase from  'firebase';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

class GigForm extends Component{

    constructor(){
        super();
        this.state = {
            image: null,
            isSelected : false,
            firstName : '',
            lastName : '',
            tagLine : '',
            email : '',
            Description : '',
            type : '',
            city : '',
            pricing : '',
            timeRequired : '',
            key : ''
        }
    }
    handleSelect = () => {
        this.setState({isSelected : !this.state.isSelected});
    }

    handleSubmit = () => {
      let uid = firebase.auth().currentUser.uid;
        firebase.firestore().collection("joboffer").add({jobcreater:uid,...this.state})
        .then((success) => {
          
          let key  = success.key;
         
          firebase.storage().ref(`JobImages/${uid}/${uid}`).getDownloadURL().then(url => {
            firebase.firestore().collection("joboffer").doc(uid).set(
              {imgUrl:url}
            )
          console.log('data added', success);
          })
        .catch((err) => {
          console.log(err);
        })
    }).catch(err=>console.log(err,'err'))
  }

    componentDidMount() {
        this.getPermissionAsync();
      }
    
      getPermissionAsync = async () => {
        if (Platform.OS !== 'web') {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      };
    
      _pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            this.setState({ image: result.uri , key : firebase.auth().currentUser.uid });
            this.uploadImage(result.uri , this.state.key);
          }
    
          console.log(result);
        } catch (E) {
          console.log(E);
        }
      };

      uploadImage = async (uri, imageName) => {
          const response = await fetch(uri);
          const blob = await response.blob();

          var ref = firebase.storage().ref().child(`JobImages/${this.state.key}/` + imageName);
          return ref.put(blob);
      }

    render(){
        let { image } = this.state;
    
        return(
            

            
            <ImageBackground source={signUp} style={styles.backgroundStyle}>

                <View style={{flexDirection : "row"}}>
                    <FAB
                            style={styles.fab}
                            small
                            icon="plus"
                            onPress={this._pickImage} 
                        /> 
                    
                    <View style={styles.imagePicker}>
                        {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
                    </View>
                </View>
                    
                
                <ScrollView style={{ marginTop : 150, marginHorizontal : 10}}>
                
                <View style={{...styles.fRow,alignItems:'center',justifyContent:'space-between'}}>
                    <TextInput style={{...styles.textInputNames,width:'45%', color : 'white'}} placeholder="First Name" underlineColorAndroid={"transparent"} value={this.state.firstName} onChangeText={(text) => this.setState({firstName: text})}/>
                    <TextInput style={{...styles.textInputNames,width:'45%', color : 'white'}} placeholder="Last Name" underlineColorAndroid={"transparent"} value={this.state.lastName} onChangeText={(text) => this.setState({lastName: text})} />
                </View>
                <TextInput style={{...styles.textInputNames,width: "100%" , color : 'white'}} placeholder="Tag Line" underlineColorAndroid={"transparent"} value={this.state.tagLine} onChangeText={(text) => this.setState({tagLine: text})} />
                <TextInput style={{...styles.textInputNames, color : 'white'}} placeholder="Email" underlineColorAndroid={"transparent"} value={this.state.email} onChangeText={(text) => this.setState({email: text})}/>
                <TextInput style={{...styles.textInputNames , color : 'white'}} placeholder="Description" underlineColorAndroid={"transparent"} value={this.state.Description} multiline={true} onChangeText={(text) => this.setState({Description: text})}/>

                <View style={{...styles.fRow,alignItems:'center',justifyContent:'space-between'}}>
                    <TextInput style={{...styles.textInputNames,width:'60%' , color : 'white'}} placeholder="Type of Task" underlineColorAndroid={"transparent"} value={this.state.type} onChangeText={(text) => this.setState({type: text})}/>
                    <TextInput style={{...styles.textInputNames,width:'30%' , color : 'white'}} placeholder="City" underlineColorAndroid={"transparent"} value={this.state.city} onChangeText={(text) => this.setState({city: text})} />
                </View>

                <View style={{...styles.fRow,alignItems:'center',justifyContent:'space-between'}}>
                    <TextInput style={{...styles.textInputNames,width:'45%' , color : 'white'}} placeholder="Pricing" underlineColorAndroid={"transparent"} value={this.state.pricing} onChangeText={(text) => this.setState({pricing: text})}/>
                    <TextInput style={{...styles.textInputNames,width:'45%' , color : 'white'}} placeholder="Time required" underlineColorAndroid={"transparent"} value={this.state.timeRequired} onChangeText={(text) => this.setState({timeRequired: text})}/>
                </View>

                <View style={styles.checkboxContainer}>
                            <CheckBox
                            checked={this.state.isSelected}
                            onPress={this.handleSelect}
                            style={{...styles.checkbox,backgroundColor:'gray'}}
                            color={'gray'}
                            
                            />
                            <Text style={{...styles.label,marginLeft:25}}>Available for contact??</Text>
                </View>

                <TouchableOpacity style={{paddingTop : 25}} onPress={this.handleSubmit}>
                    <View style={styles.button}>
                        <Text style={{color : "white" , fontWeight : 'bold'}}> POST </Text>
                    </View>
                    
                </TouchableOpacity>
                
                </ScrollView>
                
            </ImageBackground>
            
        )
    }
}
export default GigForm;

const styles = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height
    },
    fRow:{
        display:'flex',
        flexDirection:'row'
    },
    fCol:{
        display:'flex',
        flexDirection:'column'
    },
    center : {
        flex : 1,
        marginTop : 150,
        justifyContent : 'center', 
        paddingLeft : 40,
        paddingRight : 40
    },
    fab: {
        position: 'absolute',
        margin: 25,
        left : 20,
        top : 20,
        padding : 10,
        marginBottom : 10,
        backgroundColor : "#810000"
      },
   
    textInputNames : {
        alignSelf : "stretch",
        height : 40,
        marginBottom : 25,
        borderBottomWidth : 2,
        borderBottomColor : "#4a3f35",
    },
    checkboxContainer: {
        flexDirection: "row",
        color : "white"
      },
      checkbox: {
        alignSelf: "center",
      },
      label: {
        margin: 8,
        color : "white"
      },
    
    button: {
      backgroundColor: "#810000",
      height: 50,
      marginHorizontal: 25,
      borderRadius: 35,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 5,
      shadowOffset : {width : 2, height : 2},
      shadowColor : 'black',
      shadowOpacity : 0.2,
    },
    backgroundStyle : {
        width : "100%",
        height : "100%"
    },
    imagePicker : {
        position: 'absolute',
        margin: 25,
        left : 100,
        top : 20,
        padding : 10,
        marginBottom : 10,
    }
})
