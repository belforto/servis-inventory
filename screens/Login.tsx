import React ,{ useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as SecureStore  from 'expo-secure-store';
import { read } from 'fs';
//import console = require('console');

import Endpoints from '../utils/Endpoints';

import {callAuthenticationBackend} from '../utils/Endpoints';

export default class Login extends React.Component {
  state = {
    username: "a",
    password: "b"
  }
  
  componentDidMount(){
  this.checkIfUserIsLogedIn()
 }

 checkIfUserIsLogedIn = async () => {
  var existingCredentials = await SecureStore.getItemAsync('korisnickiPodaciX');
  if(existingCredentials===null ) {throw new Error('Korisnik ne postoji lokalno');}
  else{
    this.setState({
       username: existingCredentials.username, 
       password: existingCredentials.password 
      });

    this.props.navigation.navigate('Root', { existingCredentials:existingCredentials });
  }

 }

  authenticate = async () => {
    const { username, password } = this.state;
    var credentials = { username, password };
    try {
      
      var loginData= await callAuthenticationBackend("&username="+username+"&password="+password);
      console.log(loginData)
      if(loginData!=null){
      
        credentials = { username:loginData.username, password:loginData.password };
      
       
       await SecureStore.setItemAsync(
         'korisnickiPodaciX',
         JSON.stringify(credentials)
       );
       this.props.navigation.navigate('Root');
      }
    
    } catch (e) {
     // console.log(e);
      /*
      // ASK ENDPOINT IF USER EXISTS
      */
     
     
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>DUING</Text>
        <Text style={styles.underlogoText}>aplikacija</Text>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Korisničko ime"
            placeholderTextColor="#fb5b5a"
            onChangeText={text => this.setState({ username: text })} />
        </View>
        <View style={styles.inputView} >
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Lozinka"
            placeholderTextColor="#fb5b5a"
            onChangeText={text => this.setState({ password: text })} />
        </View>
        
        <TouchableOpacity style={styles.loginBtn} onPress={async () => {
          console.log("press log in");
          this.authenticate();
         
        }}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
       


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 80,
    color: "#fb5b5a",
    marginBottom: 40,
  
  },
  underlogoText: {
    
    fontSize: 30,
    color: "#fb5b5a",
    marginBottom: 40,
    fontFamily:"sans-serif-thin"
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "white"
  },
  forgot: {
    color: "white",
    fontSize: 11
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: "white"
  }
});