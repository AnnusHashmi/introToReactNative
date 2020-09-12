import React, { Component } from 'react';
import { StyleSheet, Text, View ,TextInput, ScrollView, SafeAreaView, TouchableOpacity, Image, LogBox, Dimensions, ImageBackground } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import * as firebase from 'firebase';
import bg from './bg.jpg'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width , height} = Dimensions.get('window');

class HomeActor extends Component{

    constructor(props){
        super(props);
        this.state = {
            jobs : [],
            jobsArray:null,
            url : '',
            uid : '',
        }
    }

    componentWillMount(){
        this.startHeaderHeight = 110;

        if(Platform.OS === 'andriod'){
            this.startHeaderHeight = 130 + StatusBar.currentHeight;
        }
    }
    
    componentDidMount(){
        var tempArr = [];
        firebase.firestore().collection("joboffer").onSnapshot((res) => {
            res.forEach((each) => {
                console.log(each.ref.id,'eachhhhhh')
                // console.log("each: ",each);
                tempArr.push({...each.data(),jobId:each.ref.id}); 
            })
            this.setState({jobs : tempArr})
        })

        this.setState({uid: firebase.auth().currentUser.uid})
        console.log(firebase.auth().currentUser.uid,'current user');
        console.log("user in homepage",this.props.user);

        console.log("this is the uid in homepage: ", this.state.uid);
    }

    

    render(){

            {
               var jobsArray = Object.values(this.state.jobs)
            }
    
            
        return(
            
            <ImageBackground source={bg} style={styles.backgroundStyle}>
            <SafeAreaView >
                <View style={{height : this.startHeaderHeight , borderBottomWidth : 2 , borderBottomColor : "#dddd", backgroundColor : "white" , }}>
                        <View style={{flexDirection : 'row' , padding : 10, backgroundColor : "white", marginHorizontal : 20, shadowColor : 'black', shadowOpacity : 0.2, elevation: 8 , marginTop : Platform.OS == 'android' ? 40 : null}}>
                            <TextInput placeholder="Search your favroite actor!" underlineColorAndroid='transparent' style={{flex : 1 , fontWeight : '700', backgroundColor : 'white'}} />
                        </View>
                </View>

                <ScrollView style={{ height:"80%", marginBottom: 100 }}>
                    {
                        jobsArray.map((job) => {
                            console.log(job,'jobbbb') 
                            return(
                                <View style={{marginVertical : 10, shadowColor : 'black', shadowOpacity : 0.9, elevation: 15 , marginHorizontal: 10  }}>
                                    <Card style={{marginHorizontal : 10, backgroundColor : '#f6f6f6'}}>
                                        <Card.Content>

                                            <View style={{ padding : 5}}>
                                                <Card.Cover source={{ uri: job.image }} style={{borderWidth : 0.5}} />
                                                
                                                <Title style={{fontSize: 25, paddingTop : 10 }}>{job.tagLine}</Title>
                                                <Paragraph><Text>Posted by :</Text>{job.firstName} {job.lastName}</Paragraph>   
                                                <Paragraph> {job.Description} </Paragraph>
                                                <Paragraph>Job Type :  #{job.type} </Paragraph>
                                                
                                                <View style={{flexDirection : "row", paddingTop : 5}}>
                                                        <Paragraph>Price : {job.pricing} </Paragraph>
                                                        <Paragraph style={{paddingLeft: 80}}>Time allowed : {job.timeRequired} </Paragraph>
                                                </View>
                                                
                                                <View style={{flexDirection:'row', justifyContent : 'center'}}>


                                                    <TouchableOpacity style={{...styles.button , flexDirection : 'row'}}> 
                                                        <Icon name="chat" color="white"  size={25}/> 
                                                        <Text style={{color: "white"}}> CHAT </Text>      
                                                    </TouchableOpacity>

                                                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('CreateOffer',{jobId:job.jobId,userId:this.props.user})}} style={{...styles.button , flexDirection : 'row'}}>  
                                                        <Icon name="tag" color="white"  size={25}/>
                                                        <Text style={{color: "white"}}> Create Offer </Text>      
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            
                                        </Card.Content>
                                    </Card>
                                    
                                 </View>
                            )
                        })
                    }
                 </ScrollView>
            </SafeAreaView>
            </ImageBackground>
        );
    }
}

export default HomeActor;

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#cf7500',
        height: 30,
        marginHorizontal: 10,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset : {width : 2, height : 2},
        shadowColor : 'black',
        shadowOpacity : 0.2,
        elevation : 2,
        marginTop : 15,
        paddingHorizontal : 20
        
      },
      subHeading : {
          fontSize : 20, 
          fontWeight : "bold"
      },
      backgroundStyle : {
        width : "100%",
        height : "100%",
    },
  });
  