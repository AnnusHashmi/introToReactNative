import React, { Component } from 'react';
import { View, Text, StyleSheet, Image ,Dimensions, TextInput , SafeAreaView, Platform, StatusBar, ScrollView, ImageBackground} from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import Slider from '../../component/HomeSlider/slider';
import HomeCard from '../../component/HomeCards/homeCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase'
const {width , height} = Dimensions.get('window');
import homebg from './Images/bg.jpg'

class Home extends Component{
    state={
        gigs:[],
    }
    componentWillMount(){
        this.startHeaderHeight = 110;
        if(Platform.OS === 'andriod'){
            this.startHeaderHeight = 130 + StatusBar.currentHeight;
        }
    }
    componentDidMount(){
        firebase.firestore().collection("actorsgigs").onSnapshot((res) => {
        var tempArr=[];
            res.forEach((each) => {
                console.log(each.ref.id,'eachhhhhh')
                // console.log("each: ",each);
                tempArr.push({...each.data(),gigId:each.ref.id}); 
            })
            this.setState({gigs : tempArr})
        })
    }
    render(){
        return(
            <ImageBackground source={homebg} style={styles.backgroundStyle}>
            <SafeAreaView style={{flex : 1}}>
                <View style={{flex : 1}}>
                    <View style={{height : this.startHeaderHeight , borderBottomWidth : 2 , borderBottomColor : "#dddd", backgroundColor : "white"}}>
                        <View style={{flexDirection : 'row' , padding : 10, backgroundColor : "white", marginHorizontal : 20, shadowColor : 'black', shadowOpacity : 0.2, elevation: 8 , marginTop : Platform.OS == 'android' ? 40 : null}}>

                            <TextInput placeholder="Search your favroite actor!" underlineColorAndroid='transparent' style={{flex : 1 , fontWeight : '700', backgroundColor : 'white'}} />

                        </View>
                    </View>

                    <ScrollView scrollEventThrottle={16} showsHorizontalScrollIndicator={false}>
                        <View >
                        <Text style={{ fontSize : 26 , fontWeight : '700' , paddingHorizontal : 20, paddingVertical : 20 }}>Perfect place to find talent</Text>
                            {this.state.gigs.map((e)=>{
                                return (
                                <View style={{marginVertical : 12, shadowColor : 'black', shadowOpacity : 0.7, elevation: 15 , marginHorizontal: 15  }}>
                                <Card>
                                    <Card.Content>

                                        <View style={{ padding : 5}}>
                                            <Card.Cover source={{ uri: e.image }} style={{justifyContent : "center" , resizeMode : 'cover'}} />
                                            
                                            <Title style={{fontSize: 25 , paddingTop : 10 }}>{e.firstName} {e.lastName}</Title>
                                            <Paragraph style={{fontSize : 16 , paddingVertical: 5}}>{e.tagLine}</Paragraph>  

                                            <View style={{flexDirection : 'row'}}>
                                                <Paragraph style={{fontSize : 16 , paddingVertical: 5}}> Price: ${e.pricing} </Paragraph>
                                                <Paragraph style={{fontSize : 16 , paddingVertical: 5 , paddingLeft : 5}}> Category: #{e.type} </Paragraph>
                                            </View> 
                                            
                                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('CreateOffer',{gigId:e.gigId,userId:this.props.user})}} style={{...styles.button , flexDirection : 'row'}}>  
                                                    
                                                    <Text style={{color: "white"}}> Create Offer </Text>      
                                                </TouchableOpacity>
                                            
                                        </View>
                                        
                                    </Card.Content>
                                </Card>
                                
                             </View>
                             )
                            })}
                        </View>
                        
                    </ScrollView>
                </View>
            </SafeAreaView>
            </ImageBackground>
        )
    }
    
}

export default Home;

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#cf7500',
        height: 30,
        marginHorizontal: 55,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowOffset : {width : 2, height : 2},
        shadowColor : 'black',
        shadowOpacity : 0.2,
        elevation : 2,
        marginTop : 15,
        
      },
      backgroundStyle : {
        width : "100%",
        height : "100%"
    },
})