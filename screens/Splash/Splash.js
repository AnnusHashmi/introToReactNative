import React from 'react';
import { View, Text, StyleSheet, Image ,Dimensions, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

const {width , height} = Dimensions.get('window')

const SplashScreen = ({navigation}) => {

    setTimeout(() => {
        navigation.replace('Login')
    } , 3000);
    return(
        <View style={{...styles.backgroundStyle , ...styles.center , flex : 1 , width : width , height : height}}>
            <Image source={require("./logo.png")} />
        </View>
    )
}

export default SplashScreen;


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
    backgroundStyle : {
        backgroundColor : "#f08a5d"
    }
});
