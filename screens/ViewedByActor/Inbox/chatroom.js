import React, { Component } from 'react';
import { View, Text, Platform, Dimensions, Animated, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import * as firebase from 'firebase'
const { width } = Dimensions.get('window');

class Chatroom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chats: [],
        }
    }

    componentDidMount() {
        this.getChatRooms();
    }

    getChatRooms() {
        // console.log("user chatrooms")
        var myuid = firebase.auth().currentUser.uid;
        var temp = [];
        firebase.firestore().collection('chatrooms').where(`users.${myuid}`, '==', true).onSnapshot((data) => {
            data.forEach((each) => {
                // console.log(each.data(), 'eachhhhh chatroom');
                var obj = { ...each.data(), chatId: each.ref.id };
                temp.push(obj);
            })
            this.setState({ chats: temp });
        })


    }
    chat=(chatData)=>{
        // console.log("chating");
        // console.log(this.props,'props')
        this.props.navigation.navigate('Chat',{chatData});
    }


    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', marginTop: '5%', }}>
                <View style={{ flex: 0.1, padding: 20 }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Chats</Text>
                </View>
                <View style={{ flex: 1, }}>
                    <ScrollView>
                        {this.state.chats.map((e) => {
                            
                            return <TouchableOpacity onPress={()=>this.chat(e)}>
                                <View style={{ borderWidth: 0.5, padding: 20 , flexDirection : 'row', backgroundColor : '#FF6347' }}>
                                    <Icon name="chat" color="white" size={25} style={{paddingRight : 10}} />
                                    <Text style={{color : "white"}}>{e.businessmanName}  </Text>
                                </View>
                            </TouchableOpacity>
                        })}
                    </ScrollView>
                </View>
            </View>
        )
    }

}

export default Chatroom;