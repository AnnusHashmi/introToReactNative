import React from 'react';
import {View, SafeAreaView, ScrollView,StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
  Button
} from 'react-native-paper';
import Auth from '../Auth/index'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase';
import { NavigationActions } from 'react-navigation'


const Profile = (props) => {
    
   
    const myCustomShare = async() => {
        const shareOptions = {
          message: 'Order your next meal from FoodFinder App. I\'ve already ordered more than 10 meals on it.',
          url: files.appLogo,
          // urls: [files.image1, files.image2]
        }
    
        try {
          const ShareResponse = await Share.open(shareOptions);
          console.log(JSON.stringify(ShareResponse));
        } catch(error) {
          console.log('Error => ', error);
        }
      };
    // const navigation = useNavigation();
   let userName = firebase.auth().currentUser.displayName;
   let profilePic = firebase.auth().currentUser.photoURL;
   let phoneNumber = firebase.auth().currentUser.phoneNumber;
   let email = firebase.auth().currentUser.email;

    return(

        <ScrollView style={{marginTop : 30}}>
            <View style={styles.userInfoSection}>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                <Avatar.Image 
                    source={{
                    uri: profilePic,
                    }}
                    size={80}
                />
                <View style={{marginLeft: 20}}>
                    <Title style={[styles.title, {
                    marginTop:15,
                    marginBottom: 5,
                    }]}>{userName}</Title>
                    <Caption style={styles.caption}> {email} </Caption>
                </View>
        
                </View>
            </View>

        <View style={styles.userInfoSection}>
            <View style={styles.row}>
                  <Icon name="google-maps" color="#777777" size={20}/> 
                <Text style={{color:"#777777", marginLeft: 20}}>Kolkata, India</Text>
            </View>

            <View style={styles.row}>
                 <Icon name="phone" color="#777777" size={20}/>
                  <Text style={{color:"#777777", marginLeft: 20}}>{phoneNumber}</Text>
            </View>

            <View style={styles.row}>
                 <Icon name="email" color="#777777" size={20}/> 
                <Text style={{color:"#777777", marginLeft: 20}}>SM_sajideend42@gmail.com</Text>
            </View>
        </View>

        <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>₹140.50</Title>
            <Caption>Wallet</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>12</Title>
            <Caption>Orders</Caption>
          </View>
        </View>

        <View style={styles.menuWrapper}>
            <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
                <Icon name="heart-outline" color="#FF6347" size={25}/>
                <Text style={styles.menuItemText}>Your Favorites</Text>
            </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
                <Icon name="cash" color="#FF6347" size={25}/>
                <Text style={styles.menuItemText}>Payment</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={myCustomShare}>
            <View style={styles.menuItem}>
                <Icon name="share-outline" color="#FF6347" size={25}/>
                <Text style={styles.menuItemText}>Tell Your Friends</Text>
            </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
                <Icon name="account-check-outline" color="#FF6347" size={25}/>
                <Text style={styles.menuItemText}>Support</Text>
            </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
                <Icon name="settings-outline" color="#FF6347" size={25}/>
                <Text style={styles.menuItemText}>Settings</Text>
            </View>
            </TouchableRipple>

            <View style={{marginHorizontal : 100, marginTop : 10}}>
              <Button icon="camera" mode="text" onPress={() => {
                firebase.auth().signOut().then(function() {
                      props.signout();
                    console.log("this is the log: ",navigation);
                   
                  }).catch(function(error) {
                    // An error happened.
                  });
                }}
                color="#FF6347">
                  <Text>Sign out</Text>
              </Button>
            </View>
            
        </View>
        </ScrollView>
                
        
    )
    
}

export default Profile;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    userInfoSection: {
      paddingHorizontal: 30,
      marginBottom: 25,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      fontWeight: '500',
    },
    row: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    infoBoxWrapper: {
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1,
      borderTopColor: '#dddddd',
      borderTopWidth: 1,
      flexDirection: 'row',
      height: 100,
    },
    infoBox: {
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuWrapper: {
      marginTop: 10,
    },
    menuItem: {
      flexDirection: 'row',
      paddingVertical: 15,
      paddingHorizontal: 30,
    },
    menuItemText: {
      color: '#777777',
      marginLeft: 20,
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 26,
    },
  });