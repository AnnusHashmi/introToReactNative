import { createStackNavigator } from "@react-navigation/stack";
import React from 'react'
import * as Routes from "../../screens/ViewedByActor/Inbox/index";
import Home from '../../screens/Home/Home'
import CreateOffer from '../../screens/CreateOffer/createOffer'
// import Chatroom from '../../screens/Inbox/chatroom'
import Inbox from '../../screens/ViewedByActor/Inbox/inboxActor'
const HomeStack = createStackNavigator();

export default HomeNavigator = (props )=>{
    return(
           <HomeStack.Navigator initialRouteName={"Home"} headerMode={"none"}>
           <HomeStack.Screen name={"Home"}  component={(props)=><Home {...props} user={props.user} />} />
           <HomeStack.Screen name={"CreateOffer"} component={(props)=><CreateOffer {...props} user={props.user} />}/>
           <HomeStack.Screen name={"Chat"} component={Inbox}/> 
           </HomeStack.Navigator>
)
} 

