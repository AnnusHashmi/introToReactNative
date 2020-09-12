import { createStackNavigator } from "@react-navigation/stack";
import React from 'react'
import Chatroom from "../../screens/Inbox/chatroom";
import Inbox from '../../screens/Inbox/inbox'
const ChatStack = createStackNavigator();

export default ChatNavigation = (props)=>{
    return(
           <ChatStack.Navigator initialRouteName={"chats"} headerMode={'none'}>
           <ChatStack.Screen name={"chatroom"}  component={(props)=><Chatroom {...props}/>}/>
           <ChatStack.Screen name={"inbox"} component={(props)=><Inbox {...props} />}/>
           </ChatStack.Navigator>
)
} 

