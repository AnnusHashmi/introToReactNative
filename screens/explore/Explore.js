import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image ,Dimensions, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const {width , height} = Dimensions.get('window');
import * as firebase from 'firebase'
import { Button,Card,Paragraph,Title } from 'react-native-paper';
// var arr = [];
export default class  Explore extends Component {
    constructor(){
        super();
        this.state={
            bids:[],
        }    

    }
    getData(){
        var uid = firebase.auth().currentUser.uid;
        // console.log(uid,'my uid');
            var temp = []
            firebase.firestore().collection('joboffer').where("jobcreater","==",uid).onSnapshot( (res)=>{
                res.forEach((each)=>{
               console.log(each.ref.id,'eachhh job')
               var id = each.ref.id;
               firebase.firestore().collection('joboffer').doc(id).collection('actorbid').onSnapshot((data)=>{
                    data.forEach((e)=>{
                       console.log(e.ref.id,'eachh bid')
                       var obj = {jobId:id,bidId:e.ref.id,...e.data()};
                       temp.push(obj);
                       this.setState({bids:temp}); 
                   })
               })
           })
           })
    }
   componentDidMount(){
       this.setState({bids:[]})
        this.getData();
    };
    accept=(bidId,jobId,actorId,actorName)=>{
        console.log(bidId,jobId,actorId,'bidId');
        firebase.firestore().collection('joboffer').doc(jobId).collection('actorbid').doc(bidId).update({
           status:'accepted' 
        }).then((data)=>{
            console.log(data,'data');
            console.log(actorId,'actorId')
            this.createChatRoom(actorId,actorName);
        })
        .catch((e)=>{
            console.log(e,'err')
        })


    }
    createChatRoom(actorId,actorName){    
    const myId = firebase.auth().currentUser.uid;
    const myName = firebase.auth().currentUser.displayName;
    console.log(myId,'myid')
    let chatExist = false;
    firebase.firestore().collection('chatrooms').where(`users.${actorId}`,'==',true).where(`users.${myId}`,"==",true)
    .get().then((snapshot)=>{
        snapshot.forEach((elem)=>{
            chatExist = {data:elem.data(),_id:elem.id}
        })
    })
    if(!chatExist){
        const obj = {created_At:Date.now(),users:{[actorId]:true,[myId]:true},actorName,businessmanName:myName};
        firebase.firestore().collection('chatrooms').add(obj).then((snapshot)=>{
            this.setState({chatroom:{data:obj, _id:snapshot.id}})
        })
    }


    }
    render(){
        var uid = firebase.auth().currentUser.uid;
        console.log(this.state.bids,'bids in render');
    return(
        <SafeAreaView style={{flex : 1 , alignItems : 'center',justifyContent : 'center'}}>

            <View>
                <Text style={styles.header}>Notifications</Text>
            </View>

            <View>
                <Text style={styles.subheader}>see here who got back to you!</Text>
            </View>

            <ScrollView>
                {this.state.bids.map((e)=>{
                    if(uid!==e.actorId){    
                    return <Card>
                    <Card.Content>
                      <Title>{e.actorName}</Title>
                      <Paragraph>{e.detail}</Paragraph>
                      <Paragraph>{e.timeRequired}</Paragraph>
                      <Paragraph>{e.price}</Paragraph>
                    {
                       (e.status==='pending') && 
                       <View>
                        <Button onPress={()=>this.accept(e.bidId,e.jobId,e.actorId,e.actorName)}>Accept</Button>
                        <Button>Cancel</Button>
                       </View>  
                }
                    </Card.Content>
                  </Card>
                    }
                })}
            </ScrollView>
            
        </SafeAreaView>
    )}
           

}

// export default Explore;


const styles = StyleSheet.create({
    header : {
        fontSize : 24,
        fontWeight : 'bold',
        paddingHorizontal : 20,
        marginTop : 50
    },
    subheader : {
        fontSize : 20,
        fontWeight : 'bold',
        paddingHorizontal : 20,
        marginTop : 30,
        paddingBottom : 50
    },
    // button: {
    //     backgroundColor: '#cf7500',
    //     height: 30,
    //     marginHorizontal: 10,
    //     borderRadius: 35,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     marginVertical: 5,
    //     shadowOffset : {width : 2, height : 2},
    //     shadowColor : 'black',
    //     shadowOpacity : 0.2,
    //     elevation : 2,
    //     marginTop : 15,
    //     paddingHorizontal : 10
        
    //   },
})