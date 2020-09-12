import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Button from './buttonStrip'
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';

export default class CardFormScreen extends Component {
constructor(){
  super();
  this.state = {
    loading: false,
    token: null,
  }
}
// static title = 'Card Form'
  


AddCard = () => {
  try {
    this.setState({ loading: true, token: null },()=>{
      const params = {
        // mandatory
        number: '4242424242424242',
        expMonth: 11,
        expYear: 17,
        cvc: '223',
        // optional
        name: 'Test User',
        currency: 'usd',
        addressLine1: '123 Test Street',
        addressLine2: 'Apt. 5',
        addressCity: 'Test City',
        addressState: 'Test State',
        addressCountry: 'Test Country',
        addressZip: '55555',
      };
      
       Stripe.createTokenWithCardAsync(params).then(token=>{
        console.log("token:",token.tokenId)
      })
      // this.setState({ loading: false, token })
    })
  } 
  catch (error) {
    this.setState({ loading: false })
  }
}

  

  render() {
    const { loading, token } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Card Form Example
        </Text>
        <Text style={styles.instruction}>
          Click button to show Card Form dialog.
        </Text>
        <Button
          text="Enter you card and pay"
          loading={loading}
          onPress={this.AddCard}
        />
        <View
          style={styles.token}
        >
          {token &&
            <Text style={styles.instruction}>
              Token: {token.tokenId}
            </Text>
          }
        </View>
      </View>
    )
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
})