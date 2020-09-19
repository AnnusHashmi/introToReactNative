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
            firebase.firestore().collection('actorsgigs').where("jobcreater","==",uid).get().then( (res)=>{
                res.forEach((each)=>{
               console.log(each.ref.id,'eachhh job')
               var id = each.ref.id;
               firebase.firestore().collection('actorsgigs').doc(id).collection('businessmanbid').onSnapshot((data)=>{
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
    accept=(bidId,gigId,businessmanId,businessmanName)=>{
        // console.log(bidId,jobId,actorId,'bidId');
        firebase.firestore().collection('actorsgigs').doc(gigId).collection('businessmanbid').doc(bidId).update({
           status:'accepted' 
        }).then((data)=>{
            console.log(data,'data');
            // console.log(actorId,'actorId')
            this.getData();
            this.createChatRoom(businessmanId,businessmanName);
        })
        .catch((e)=>{
            console.log(e,'err')
        })


    }
    createChatRoom(businessmanId,businessmanName){    
    const myId = firebase.auth().currentUser.uid;
    const myName = firebase.auth().currentUser.displayName;
    console.log(myId,'myid')
    let chatExist = false;
    firebase.firestore().collection('chatrooms').where(`users.${businessmanId}`,'==',true).where(`users.${myId}`,"==",true)
    .get().then((snapshot)=>{
        snapshot.forEach((elem)=>{
            chatExist = {data:elem.data(),_id:elem.id}
        })
    })
    if(!chatExist){
        const obj = {created_At:Date.now(),users:{[businessmanId]:true,[myId]:true},businessmanName,actorName:myName};
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
                <Text style={styles.header}>No notification rightnow</Text>
            </View>

            <ScrollView>
                {this.state.bids.map((e)=>{
                    if(uid!==e.actorId){    
                    return <Card>
                    <Card.Content>
                      <Title>{e.actorName}</Title>
                    <Paragraph>{e.detail}</Paragraph>
                    {
                       (e.status==='pending') && 
                       <View>
                        <Button onPress={()=>this.accept(e.bidId,e.gigId,e.businessmanId,e.businessmanName)}>Accept</Button>
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