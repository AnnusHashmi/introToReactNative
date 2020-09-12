import React, { Component } from 'react';
import { View, Text, Platform, Dimensions, Animated, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView} from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import * as firebase from 'firebase'
const { width } = Dimensions.get('window');

class Inbox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: 0,
            xTabOne: 0,
            xTabTwo: 0,
            translateX: new Animated.Value(0),
            translateXTabOne: new Animated.Value(0),
            translateXTabTwo: new Animated.Value(width),
            translateY: -1000,
            message:'',
            messages:[],
        };
    }

    handleSlide = type => {
        let {
            active,
            xTabOne,
            xTabTwo,
            translateX,
            translateXTabOne,
            translateXTabTwo
        } = this.state;
        Animated.spring(translateX, {
            toValue: type,
            duration: 100
        }).start();
        if (active === 0) {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: 0,
                    duration: 100
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: width,
                    duration: 100
                }).start()
            ]);
        } else {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: -width,
                    duration: 100
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: 0,
                    duration: 100
                }).start()
            ]);
        }
    };


    componentWillMount() {
        this.startHeaderHeight = 110;

        if (Platform.OS === 'andriod') {
            this.startHeaderHeight = 130 + StatusBar.currentHeight;
        }
    }


    componentWillMount() {
        this.startHeaderHeight = 110;

        if (Platform.OS === 'andriod') {
            this.startHeaderHeight = 130 + StatusBar.currentHeight;
        }
    }

    componentDidMount() {
        console.log(this.props.route.params, 'params')
        this.setState({ chatData: this.props.route.params.chatData });
        this.getMessages();
        this.getTimeline();
    }
    getMessages=()=>{
        var chatId = this.props.route.params.chatData.chatId;
        firebase.firestore().collection('chatrooms').doc(chatId).collection('messages').orderBy('timestamp')
        .onSnapshot((snapshot)=>{
            const messages = [];
            snapshot.forEach((elem)=>{
                messages.push({data:elem.data(),_id:elem.id});
            })
            console.log(messages,'messages');
            this.setState({messages});
        })
    }
    getTimeline=()=>{
        var users = this.props.route.params.chatData.users;
        Object.keys(users).map(e=>{
            console.log(e,'eeee')
        })
    }   

    sendMessage=()=>{
        var chatId = this.state.chatData.chatId;
        var message = this.state.message;
        const obj = {message,userId:firebase.auth().currentUser.uid,timestamp:Date.now()};
        firebase.firestore().collection('chatrooms').doc(chatId).collection('messages').add(obj);
        this.setState({message:''});
    }

    render() {
        let {
            xTabOne,
            xTabTwo,
            translateX,
            active,
            translateXTabOne,
            translateXTabTwo,
            translateY
        } = this.state;

        const { chatData } = this.state;
        return (
            <View style={{ flex: 1 }}>

                <View style={{ height: this.startHeaderHeight, borderBottomWidth: 2, borderBottomColor: "#dddd", backgroundColor: "white", shadowColor: 'black', shadowOpacity: 0.2, elevation: 10 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 15, flexDirection: 'row', paddingHorizontal: 10 }}>

                        <Avatar.Image
                            source={{
                                uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
                            }}
                            size={60}
                        />
                        <Text style={{ paddingHorizontal: 10, fontSize: 16 }}>{chatData && chatData.actorName}</Text>
                        <View style={{ width: 40, marginLeft: 'auto' }}>
                            <Button icon="video" mode="contained" color="#FF6347" dark={true} compact={true}>

                            </Button>
                        </View>

                    </View>
                </View>
                <View
                    style={{
                        width: "90%",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 40,
                            marginBottom: 20,
                            height: 36,
                            position: "relative"
                        }}
                    >
                        <Animated.View
                            style={{
                                position: "absolute",
                                width: "50%",
                                height: "100%",
                                top: 0,
                                left: 0,
                                backgroundColor: "#FF6347",
                                borderRadius: 4,
                                transform: [
                                    {
                                        translateX
                                    }
                                ]
                            }}
                        />
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: 1,
                                borderColor: "#FF6347",
                                borderRadius: 4,
                                borderRightWidth: 0,
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0
                            }}
                            onLayout={event =>
                                this.setState({
                                    xTabOne: event.nativeEvent.layout.x
                                })
                            }
                            onPress={() =>
                                this.setState({ active: 0 }, () =>
                                    this.handleSlide(xTabOne)
                                )
                            }
                        >
                            <Text
                                style={{
                                    color: active === 0 ? "#fff" : "#FF6347"
                                }}
                            >
                                Chat
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: 1,
                                borderColor: "#FF6347",
                                borderRadius: 4,
                                borderLeftWidth: 0,
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0
                            }}
                            onLayout={event =>
                                this.setState({
                                    xTabTwo: event.nativeEvent.layout.x
                                })
                            }
                            onPress={() =>
                                this.setState({ active: 1 }, () =>
                                    this.handleSlide(xTabTwo)
                                )
                            }
                        >
                            <Text
                                style={{
                                    color: active === 1 ? "#fff" : "#FF6347"
                                }}
                            >
                                Timeline
                        </Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView>
                        <Animated.View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                transform: [
                                    {
                                        translateX: translateXTabOne
                                    }
                                ]
                            }}
                            onLayout={event =>
                                this.setState({
                                    translateY: event.nativeEvent.layout.height
                                })
                            }
                        >
                                {
                                    this.state.messages.map((e)=>{
                                        if(e.data.userId===firebase.auth().currentUser.uid){
                                            return <View style={{width:'100%',flex:1,flexDirection:'row-reverse',margin:5}}>
                                                    <Text style={{backgroundColor:'#FFFFFF',color:'black',padding:10,borderRadius:10}}>{e.data.message}</Text>
                                                </View>
                                        }else{
                                            return <View style={{width:'100%',flex:1,flexDirection:'row',margin:5}}>
                                                    <Text style={{backgroundColor:'#FF6347',color:'white',padding:10,borderRadius:10}}>{e.data.message}</Text>
                                                </View>
                                        }
                                    })
                                }
     
                            
                        </Animated.View>
                        

                        <Animated.View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                transform: [
                                    {
                                        translateX: translateXTabTwo
                                    },
                                    {
                                        translateY: -translateY
                                    }
                                ]
                            }}
                        >
                            <View style={{ flex: 1 }}>
                                <View>
                                    <Card>
                                        <Icon2 name="laugh-squint" color="#FF6347" size={55} style={{ paddingLeft: 20, paddingVertical: 10 }} />
                                        <Card.Content>
                                            <Title>Comedy Hour</Title>
                                            <Paragraph>I'll do Comedy for an hour with the best quality content amusing the crowd to the max
                                    <Text style={{ paddingHorizontal: 20, fontSize: 16, fontWeight: "bold", paddingVertical: 5 }}>  $100 </Text>
                                            </Paragraph>
                                        </Card.Content>
                                    </Card>

                                    <Card style={{ marginVertical: 20 }}>
                                        <Card.Content>
                                            <Title>Order Attachments</Title>
                                            <Icon name="attachment" color="#FF6347" size={45} />
                                            <Paragraph>Please send the related attachments for your script</Paragraph>
                                        </Card.Content>
                                    </Card>
                                </View>

                            </View>
                        </Animated.View>
                    </ScrollView>
                    <KeyboardAvoidingView style={{ flexDirection: 'row', padding: 10, backgroundColor: "white", marginHorizontal: 10, shadowColor: 'black', shadowOpacity: 0.2, elevation: 8, marginTop: Platform.OS == 'android' ? 300 : null }}>
                                <Icon name="attachment" color="#FF6347" size={25} />
                                <TextInput onChangeText={(txt)=>{this.setState({message:txt})}} placeholder="Message!" underlineColorAndroid='transparent' style={{ flex: 1, fontWeight: '700', backgroundColor: 'white', paddingHorizontal: 10 }} />
                                <Button onPress={this.sendMessage}>Send</Button>
                        </KeyboardAvoidingView>
                    
                </View>
            </View>
        )
    }

}

export default Inbox;