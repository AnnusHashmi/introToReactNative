import React, { Component } from 'react';
import { View, Text, StyleSheet, Image ,Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../../screens/Home/Home';
import Inbox from '../../screens/Inbox/inbox';
import Profile from '../../screens/Profile/Profile';
import Explore from '../../screens/explore/Explore';
import PostJobs from '../../screens/AddJobs/PostJobs';
// import Chatroom from '../../screens/Inbox/chatroom';
import ChatNavigation from './ChatNavigation'
import HomeNavigation from '../BottomNavigation/HomeNavigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function BottomNavigation(props) {
  const signout=()=>{
    props.navigation.navigate('Login');
    // props.signout();
  }
  return (
      <NavigationContainer independent={true}>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={(props)=><HomeNavigation {...props}/>} options={{
            tabBarLabel: 'Home',
            tabBarColor: '#FF6347',
            tabBarIcon: () => (
              <Icon name="home" color='#FF6347' size={26} />
            ),
          }} />

          <Tab.Screen name="Explore" component={()=><Explore/>} options={{
            tabBarLabel: 'Notifications',
            tabBarColor: '#FF6347',
            tabBarIcon: () => (
              <Icon name="account-search-outline" color='#FF6347' size={26} />
            ),
          }}/>

          <Tab.Screen name="PostJobs" component={PostJobs} options={{
            tabBarLabel: 'Post Job',
            tabBarColor: '#FF6347',
            tabBarIcon: () => (
              <Icon name="plus" color='#FF6347' size={26} />
            ),
          }}/>

          <Tab.Screen name="chats" component={(props)=>{ return <ChatNavigation {...props} />}} options={{
            tabBarLabel : 'chats',
            tabBarColor : "#FF6347",
            tabBarIcon : () => (
              <Icon name="message-text" color='#FF6347' size={26} />
            )
          }} />
          <Tab.Screen name='Profile' component={(props)=><Profile {...props} signout={signout}/>} options={{
            tabBarLabel : 'Profile',
            tabBarColor : "#FF6347",
            tabBarIcon : () => (
              <Icon name="human-greeting" color='#FF6347' size={26} />
            )
          }} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
