import React from 'react';
import { View, Text, StyleSheet, Image ,Dimensions, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

const {width , height} = Dimensions.get('window')

const SplashScreen = ({navigation}) => {

    setTimeout(() => {
        navigation.replace('Login')
    } , 3000);
    return(
        <View style={{flex : 1 , backgroundColor : "#f08a5d"}}>
            <Image source={require("./logo.png")} style={{resizeMode : "contain" , width : "100%" , height : "100%"}} />
        </View>
    )
}

export default SplashScreen;


