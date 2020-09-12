import React, { Component } from 'react';
import { View, Text, StyleSheet, Image ,Dimensions, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { CheckBox } from "native-base";
import signUp from './assets/images/signUp.jpg'
import { color } from 'react-native-reanimated';

class SignUp extends Component{

    constructor(){
        super();
        this.state = {
            isSelected : false,
          
        }
    }
    handleSelect = () => {
        this.setState({isSelected : !this.state.isSelected});
    }

    render(){
        return(
            <ImageBackground source={signUp} style={styles.backgroundStyle}>
                <View style={styles.center}>

                            
                <View style={{...styles.fRow,alignItems:'center',justifyContent:'space-between'}}>
                    <TextInput style={{...styles.textInputNames,width:'45%'}} placeholder="First Name" underlineColorAndroid={"transparent"} />
                    <TextInput style={{...styles.textInputNames,width:'45%'}} placeholder="Last Name" underlineColorAndroid={"transparent"} />
                </View>

                <TextInput style={{...styles.textInputNames}} placeholder="Email" underlineColorAndroid={"transparent"} onBlur={this.emailValidator} />
                <TextInput style={{...styles.textInputNames}} placeholder="Password" underlineColorAndroid={"transparent"} />

                <View style={{...styles.fRow,alignItems:'center',justifyContent:'space-between'}}>
                    <TextInput style={{...styles.textInputNames,width:'60%'}} placeholder="Address" underlineColorAndroid={"transparent"} />
                    <TextInput style={{...styles.textInputNames,width:'30%'}} placeholder="City" underlineColorAndroid={"transparent"} />
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

                <TouchableOpacity style={{paddingTop : 25}}>
                    <View style={styles.button}>
                        <Text style={{color : "white" , fontWeight : 'bold'}}>Register</Text>
                    </View>
                    
                </TouchableOpacity>
                </View>
            </ImageBackground>
            
        )
    }
}
export default SignUp;

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
        justifyContent : 'center', 
        paddingLeft : 40,
        paddingRight : 40
    },
    header : {
        fontSize : 24, 
        paddingBottom : 10,
        marginBottom : 60,
        borderBottomColor : "#810000" ,
        borderBottomWidth : 2,

    },

    textInputNames : {
        alignSelf : "stretch",
        height : 40,
        marginBottom : 30,
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
    }
})
