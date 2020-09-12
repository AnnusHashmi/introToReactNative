import React, { Component } from 'react';
import { View, Text, StyleSheet, Image ,Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeActor from '../../screens/ViewedByActor/Home/HomeActor.js';
import ExploreActor from '../../screens/ViewedByActor/Explore/ExploreActor.js';
import InboxActor from '../../screens/ViewedByActor/Inbox/inboxActor.js';
import ProfileActor from '../../screens/ViewedByActor/Profile/ProfileActor.js';
import GigForm from '../../screens/ViewedByActor/ActorsGigForm/gigForm';
import CreateOffer from '../../screens/ViewedByActor/Inbox/createOffer';
import firebase from '../../config'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeNavigation from "./HomeNavigation";
import ChatNavigator from './ChatNavigator'
import Chatroom from '../../screens/Inbox/chatroom.js';

const Tab = createBottomTabNavigator();

export default function BottomNavigationActors(props) {
  
  const signout=()=>{
    console.log('signing out from actor');
    props.navigation.navigate('Login');
  }
const uid = firebase.auth().currentUser.uid;
console.log(uid,'uid')
  return (
      <NavigationContainer independent={true}>
        <Tab.Navigator>
          <Tab.Screen name="HomeActor" component={(props)=><HomeNavigation {...props} user={uid} />} options={{
            tabBarLabel: 'Home',
            tabBarColor: '#FF6347',
            tabBarIcon: () => (
              <Icon name="home" color='#FF6347' size={26} />
            ),
          }} />

          <Tab.Screen name="Explore" component={ExploreActor} options={{
            tabBarLabel: 'Notifications',
            tabBarColor: '#FF6347',
            tabBarIcon: () => (
              <Icon name="account-search-outline" color='#FF6347' size={26} />
            ),
          }}/>

          <Tab.Screen name="postNow" component={GigForm} options={{
            tabBarLabel: 'POST NOW',
            tabBarColor: '#FF6347',
            tabBarIcon: () => (
              <Icon name="plus" color='#FF6347' size={26} />
            ),
          }}/>


          <Tab.Screen name="Inbox" component={ChatNavigator} options={{
            tabBarLabel : 'Inbox',
            tabBarColor : "#FF6347",
            tabBarIcon : () => (
              <Icon name="message-text" color='#FF6347' size={26} />
            )
          }} />
          <Tab.Screen name='Profile' component={(props)=><ProfileActor  {...props} signout={signout} /> }  options={{
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
