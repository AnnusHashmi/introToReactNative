import { createStackNavigator } from "@react-navigation/stack";
import React from 'react'
import Chatroom from "../../screens/ViewedByActor/Inbox/chatroom";
import Inbox from '../../screens/ViewedByActor/Inbox/inboxActor'
const ChatStack = createStackNavigator();

export default ChatNavigation = (props)=>{
    return(
           <ChatStack.Navigator initialRouteName={"chats"} headerMode={"none"}>
           <ChatStack.Screen name={"chatroom"}  component={(props)=><Chatroom {...props}/>}/>
           <ChatStack.Screen name={"Chat"} component={(props)=><Inbox {...props} />}/>
           </ChatStack.Navigator>
)
} 

