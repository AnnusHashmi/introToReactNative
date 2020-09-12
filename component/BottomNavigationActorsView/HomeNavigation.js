import { createStackNavigator } from "@react-navigation/stack";
import React from 'react'
import * as Routes from "../../screens/ViewedByActor/Inbox/index";
import Home from '../../screens/ViewedByActor/Home/HomeActor'
const HomeStack = createStackNavigator();

export default HomeNavigator = (props )=>{
    return(
           <HomeStack.Navigator initialRouteName={"Home"} headerMode={"none"}>
           <HomeStack.Screen name={"Home"}  component={(props)=><Home {...props} user={props.user} />} />
           <HomeStack.Screen name={"CreateOffer"} component={(props)=><Routes.CreateOffer {...props} user={props.user} />}/>
           <HomeStack.Screen name={"Chat"} component={Routes.Inbox}/> 
           </HomeStack.Navigator>
)
} 

