import React, { Component } from 'react';
import { View, Text, StyleSheet, Image ,Dimensions, TextInput, TouchableOpacity , SafeAreaView, Platform, StatusBar, ScrollView } from 'react-native';

class Slider extends Component{

    constructor(props){
        super(props);
        this.state = {
            
        }
    }

        render(){
            return(
                <View style={{height : 250 , width : 150, borderWidth : 1, borderColor : "#84a9ac", marginHorizontal:5, marginTop : 10, backgroundColor : "white",  shadowColor : 'black', shadowOpacity : 0.2, elevation: 15}}>
                    <View style={{flex : 2}}>
                        <Image source={this.props.imageUri} style={{flex : 1, height : null , width : null, resizeMode : 'cover'}} />
                    </View>

                    <View style={{flex : 1, paddingLeft : 10 , paddingTop : 10}}>
                        <Text style={{fontSize : 16 ,fontWeight : "bold"}}> {this.props.name} </Text>
                        <Text style={{fontSize : 14, paddingTop : 10}}> {this.props.nickName} </Text>
                    </View>
                </View>
            )
        }
    }


export default Slider;