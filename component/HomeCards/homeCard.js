import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import StarRating from 'react-native-star-rating';

class HomeCard extends Component{

    constructor(props){
        super(props);

        this.state=[

        ]
    }

    render(){
        return(
            <View style={{width : this.props.width/2 - 30 , height: this.props.width/2 - 30 , borderWidth : 2 , borderColor : "#dddd" }}>
                <View style={{flex : 1}}>
                    <Image source={this.props.imageUri} style={{flex : 1 , width : null , height : null , resizeMode : 'cover'}} />
                </View>

                <View style = {{flex : 1}}>
                        <Text style={{fontSize : 12}}> {this.props.name} </Text>
                        <Text style={{fontSize : 10 , fontWeight : 'bold'}}>Tv Show Host</Text>
                        <Text style={{fontSize : 10}}> ${this.props.price} </Text>
                        <StarRating disabled={true} maxStars={5} rating={this.props.rating} starSize={10} />
                </View>
            </View>
        )
    }
}

export default HomeCard