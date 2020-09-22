import React, { Component } from 'react';
import {View, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  Card,
  Paragraph,
  Button
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as firebase from 'firebase';



class Profile extends Component{

    state = {
      gigs : [],
      
    }
  
  
  componentDidMount(){
    firebase.firestore().collection("actorsgigs").get().then((res) => {
    var tempArr=[];
        res.forEach((each) => {
            console.log(each.ref.id,'eachhhhhh in actor profile')
            // console.log("each: ",each);
            tempArr.push({...each.data(),gigId:each.ref.id}); 
        })
        this.setState({gigs : tempArr})
    })
}

  render(){
      

      const name = firebase.auth().currentUser.displayName;
      const displayPicture = firebase.auth().currentUser.photoURL;
      const email = firebase.auth().currentUser.email;
      const phoneNumber = firebase.auth().currentUser.phoneNumber

    return(
        <SafeAreaView style={{marginTop : 30}}>
            <ScrollView>
            <View style={styles.userInfoSection}>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                <Avatar.Image 
                    source={{
                    uri: displayPicture,
                    }}
                    size={80}
                />
                <View style={{marginLeft: 20}}>
                    <Title style={[styles.title, {
                    marginTop:15,
                    marginBottom: 5,
                    }]}>{name}</Title>
                    <Caption style={styles.caption}>@sam_labs</Caption>
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
                <Text style={{color:"#777777", marginLeft: 20}}>{email}</Text>
            </View>
        </View>

        <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>₹0.00</Title>
            <Caption>Wallet</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>10</Title>
            <Caption>Orders</Caption>
          </View>
        </View>

        <View style={styles.menuWrapper}>
            
            {
              this.state.gigs.map((gig) => {
                if(firebase.auth().currentUser.uid === gig.jobcreater){
                  return(
                    <View>
                      <View>
                          <Card>
                            <Card.Content>
                              <Title style={{textAlign : 'center'}}>{gig.tagLine}</Title>
                              <Paragraph>Cost : ${gig.pricing}</Paragraph>
                            </Card.Content>
                          </Card>
                        </View> 
  
                        <View>
                          <Text style={{fontSize : 24 , fontWeight : "bold" , textAlign : "center" , marginVertical : 20}}>No job posted yet</Text>
                        </View>
                    </View>  
                  )
                }
                else{
                  <View>
                    <Text> No gigs posted by you! </Text>
                  </View>
                }
                
              })
            }

            <View style={{marginHorizontal : 100, marginTop : 10}}>
              <Button mode="text" onPress={() => {firebase.auth().signOut().then(()=>{
                    // console.log("this is the log: ",navigation);
                    this.props.signout();
                  }).catch(function(error) {
                    // An error happened.
                    console.log(error,'err in signout');
                  });}}  
                color="#FF6347">
                  <Text>Sign out</Text>
              </Button>
            </View>
            
        </View>
        </ScrollView>
        </SafeAreaView>
        
    )
  }
    
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
    adButton : {
      alignItems : "center",
      justifyContent : "center",
      marginHorizontal : 70,
      padding : 10
    }
  });