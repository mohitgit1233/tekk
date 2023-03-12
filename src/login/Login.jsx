import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Input, NativeBaseProvider } from 'native-base';
import { AppStack } from '../technician/stacks/AppStack';
import { Chat } from '../technician/screens/Chat';
import { AppStackClient } from '../client/stacks/AppStackClient';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-ionicons';
import { CommonActions } from '@react-navigation/native';
import {login} from '../../services/api'

const Tab = createMaterialTopTabNavigator();

// import jobFeed from './technician/JobPosts';
const Stack = createNativeStackNavigator();

export const Login = () => {
  const navigation = useNavigation();
  const [show, setShow] = React.useState(false);
  const [text, setText] = useState("a2@gmail.com");
  const [text2, setText2] = useState("12345678");
  const handleTextChange = (inputText) => {
    setText(inputText);
  };
  const handleTextChange2 = (inputText) => {
    setText2(inputText);
  };
  const handleSubmit = async () => {
    // Do something with the text value, e.g. send it to a server
    //technician
    // navigation.navigate('technicianHome');
    body1 = {
      "email": text,
      "password": text2
    }
    const json1 = await login(null, body1);
    console.log(json1);
    if ( json1.error === false){
      console.log("4444444444444444");
      console.log(json1.data.name);
      if (json1.isTechnician===true){
      // Reset the navigation stack and navigate to the technician portal
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'technicianHome',params: {
            refreshData: 'example value',
           
          }, }],
        })
      );
      }else{
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'clientHome' }],
          })
        );
      }
    }else {
      console.log("login failed");
    }





    console.log(text);
  };
  const handleSubmit2 = () => {
    // Do something with the text value, e.g. send it to a server
    //client
    // navigation.navigate('clientHome');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'clientHome' }],
      })
    );
  };
  const handleSubmit3 = () => {
    // Do something with the text value, e.g. send it to a server
    //client
    navigation.navigate('imageUpload');
    
  };



  return (

    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={{fontSize:30}}>Sign into your account</Text>
      <Text>Use email: as@gmail.com for client login</Text>


      <Input w={{
      base: "75%",
      md: "25%"
    }}style={styles.field} 
    InputLeftElement={<Icon  size={5} ml="2" color="muted.400" />} placeholder="Email" onChangeText={(e)=>setText(e)} defaultValue={text} />

      <Input w={{
      base: "75%",
      md: "25%"
    }} style={styles.field} 
    type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
            <Icon  size={5} mr="2" color="muted.400" />
          </Pressable>} placeholder="Password"   onChangeText={(e)=>setText2(e)} defaultValue={text2} />


      <Button style={styles.botton}
        title="Login"
        onPress={handleSubmit}
      />
      {/* <Button style={styles.botton}
        title="Login as Client"
        onPress={handleSubmit2}
      /> */}
      {/* <Button style={styles.botton}
        title="Upload image bro"
        onPress={handleSubmit3}
      /> */}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  field:{
    fontSize:'x-large',
    border: '1% solid black',
    marginBottom:'2%'
    
  },
  botton:{
    margin:'10%',
    padding:'10%'
  }
});
