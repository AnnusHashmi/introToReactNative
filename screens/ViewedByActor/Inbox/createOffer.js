import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView,ScrollView} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
// import { ScrollView } from 'react-native-gesture-handler';
import firebase from '../../../config'
class CreateOffer extends Component{

    constructor(props){
        super(props);
        this.state = {
            detail : '',
            price  : '',
            timeRequired : ''
        }
    }
    sendJobOffer=()=>{
        var myuid = firebase.auth().currentUser.uid;
        var actorName = firebase.auth().currentUser.displayName;
        var jobId = this.props.route.params.jobId;
        console.log(myuid,jobId,'myuid jobid');
        const state = this.state;
        var obj = {actorName:actorName,status:'pending',jobId,actorId:myuid,...state};
        firebase.firestore().collection('joboffer/').doc(jobId).collection('actorbid').add(obj)
        .then((res)=>{
            console.log(res,'resss');
        })
        .catch((err)=>console.log(err,'err'))
        console.log("sending job offer"); 
    }

    render(){
        const {text} = this.state;
        console.log(this.props,'props');
        console.log(this.props.route.params.jobId,'user in props');
        console.log(firebase.auth().currentUser.uid,'firebase user in create offer');
        return(
            <ScrollView style={{flex : 1}}>
                <View style={{flex : 1 , paddingVertical : 10}}>

                    <View style={{alignItems : 'center', marginVertical : 20, marginTop : 50}}>
                        <Text style={{fontSize : 24}}>Create an offer</Text>
                    </View>

                    <View style={{ borderBottomWidth : 2}}>
                        <View style={{marginHorizontal : 20, marginVertical : 20, marginTop : 50 }}>
                            <Text style={{fontWeight : 'bold' , fontSize : 20}}> Decribe Offer : </Text>
                        </View>
                        
                        <TextInput
                            label="Describe in detail"
                            value={text}
                            onChangeText={text => this.setState({detail  :text})}
                        />
                    </View>

                    <View style={{ borderBottomWidth : 2 }}>
                        <View style={{marginHorizontal : 20, marginVertical : 20, marginTop : 50 }}>
                            <Text style={{fontWeight : 'bold' , fontSize : 20}}> Total Price : </Text>
                        </View>
                        
                        <TextInput
                            label="Price"
                            value={text}
                            onChangeText={text => this.setState({price:text})}
                        />
                    </View>

                    <View style={{ borderBottomWidth : 2 }}>
                        <View style={{marginHorizontal : 20, marginVertical : 20, marginTop : 50 }}>
                            <Text style={{fontWeight : 'bold' , fontSize : 20}}> Total Time : </Text>
                        </View>
                        
                        <TextInput
                            label="time required"
                            value={text}
                            onChangeText={text => this.setState({timeRequired : text})}
                        />
                    </View>
                    <Button onPress={this.sendJobOffer}>
                        Post
                    </Button>
                </View>
                

            </ScrollView>
        );
    }
}

export default CreateOffer;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  