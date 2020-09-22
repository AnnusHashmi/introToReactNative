import React, { Component } from 'react';
import { View, Text, Platform, Dimensions, Animated, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import * as firebase from 'firebase';
import { Modal, Portal, Provider , TextInput  } from 'react-native-paper';
const { width  } = Dimensions.get('window');


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
            visible : false,
            description : '',
            price : '',
            time : '',
            milestones : []
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

    componentDidMount() {
        
        this.setState({ chatData: this.props.route.params.chatData });
        this.getMessages();
        this.getMilestone();
    }
    getMessages=()=>{
        var chatId = this.props.route.params.chatData.chatId;
        firebase.firestore().collection('chatrooms').doc(chatId).collection('messages').orderBy('timestamp')
        .onSnapshot((snapshot)=>{
            const messages = [];
            snapshot.forEach((elem)=>{
                messages.push({data:elem.data(),_id:elem.id});
            })
            
            this.setState({messages});
        })
    }

    getMilestone = () => {
        var chatId = this.props.route.params.chatData.chatId;
        firebase.firestore().collection('chatrooms').doc(chatId).collection('milestones')
        .onSnapshot((snapshot)=>{
            const tempMilestones = [];
            snapshot.forEach((elem)=>{
                tempMilestones.push({data:elem.data(),_id:elem.id});
            })
            console.log("these are the milestones: " , tempMilestones );
            this.setState({milestones : tempMilestones});
            
            
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
        
        

        var chatId = this.props.route.params.chatData.chatId;

        const showModal = () => this.setState({visible : true});
      
        const hideModal = () => this.setState({visible : false});
        let {
            xTabOne,
            xTabTwo,
            translateX,
            active,
            translateXTabOne,
            translateXTabTwo,
            translateY
        } = this.state;

        const { chatData, text } = this.state;
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
                        <Text style={{ paddingHorizontal: 10, fontSize: 16 }}>{chatData && chatData.businessmanName}</Text>
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
                            <View style={{height : 400 , width : width}}>
                                 <ScrollView>
                                    

                                     
                                {
                                    this.state.messages.map((e)=>{
                                        var myuid = firebase.auth().currentUser.uid;
                                        // console.log(firebase.auth().currentUser.uid,'my Uid')
                                        if(e.data.userId===firebase.auth().currentUser.uid){
                                            return <View style={{width:'100%',flex:1,flexDirection:'row-reverse',margin:5}}>
                                                    <Text style={{backgroundColor:'#FFFFFF',color:'black',padding:15,borderRadius:10}}>{e.data.message}</Text>
                                                </View>
                                        }else{
                                            return <View style={{width:'100%',flex:1,flexDirection:'row',margin:5}}>
                                                    <Text style={{backgroundColor:'#FF6347',color:'white',padding:15,borderRadius:10}}>{e.data.message}</Text>
                                                </View>
                                        }
                                    })
                                }
                                
                                </ScrollView>
                                </View>


                            <View style={{ flexDirection: 'row', paddingHorizontal: 10, backgroundColor: "white", marginHorizontal: 10, shadowColor: 'black', shadowOpacity: 0.2, elevation: 8, }}>
                               
                                <TextInput value={this.state.message} onChangeText={(txt)=>{this.setState({message:txt})}} placeholder="Message!" underlineColorAndroid='transparent' style={{ flex: 1, fontWeight: '700', backgroundColor: 'white', paddingHorizontal: 5 }} />
                                
                            </View>
                            <Button onPress={this.sendMessage} color="#FF6347"> Send </Button>
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
                            
                            <View>
                            <View style={{flex : 1 , paddingHorizontal : 150 }}>
                                    
                                    <Provider>

                                        <Portal>
                                        
                                            <Modal visible={this.state.visible} onDismiss={hideModal}>
                                                <ScrollView>        
                                                <TextInput
                                                label="Description"
                                                value={text}
                                                onChangeText={text => this.setState({description : text})}
                                                style={{margin : 10}}
                                                />

                                                <TextInput
                                                label="Price"
                                                value={text}
                                                onChangeText={text => this.setState({price : text})}
                                                style={{margin : 10}}
                                                />

                                                <TextInput
                                                label="Time Required"
                                                value={text}
                                                onChangeText={text => this.setState({time : text})}
                                                style={{margin : 10}}
                                                />
                                                <Button mode="contained" style={{marginHorizontal : 30}} onPress={() => {
                                                

                                                    var milestones = {
                                                        description : this.state.description,
                                                        price : this.state.price,
                                                        time : this.state.time 
                                                    };

                                                    firebase.firestore().collection("chatrooms").doc(chatId).collection("milestones").add(milestones).then(
                                                        
                                                    )
                                                    hideModal()
                                                }}> 
                                                        Add
                                                </Button>

                                                </ScrollView>
                                            </Modal>

                                            <Button style={{marginTop: 30}} onPress={showModal}>
                                                    Add milestones
                                            </Button>
                                            
                                            <View style={{zIndex : -1}}>
                                                {
                                                    this.state.milestones.map((milestone) => {
                                                        return(
                                                            <View style={{paddingTop : 10}}>
                                                                <Card>
                                                                    <Card.Content>
                                                                    <Title><Text style={{fontWeight : 'bold'}}>Description: </Text>{milestone.data.description}</Title>
                                                                    <Paragraph><Text style={{fontWeight : 'bold'}}>price:  </Text>{milestone.data.price}</Paragraph>
                                                                    <Paragraph><Text style={{fontWeight : 'bold'}}>Time Required: </Text>{milestone.data.time}</Paragraph>
                                                                    <Button icon="card" mode="text" color='#FF6347' onPress={() => console.log('Pressed')}>
                                                                        Create Payment
                                                                    </Button>
                                                                    </Card.Content>
                                                                </Card>
                                                            </View>   
                                                        )
                                                    })
                                                } 
                                            </View>
                                            
                                        </Portal>
                                    </Provider>

                                    
                                </View>
                               
                            </View>
                            
                        </Animated.View>
                    
                </View>
            </View>
        )
    }

}

export default Inbox;