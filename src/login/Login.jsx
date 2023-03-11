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


const Tab = createMaterialTopTabNavigator();

// import jobFeed from './technician/JobPosts';
const Stack = createNativeStackNavigator();

export const Login = () => {
  const navigation = useNavigation();
  const [show, setShow] = React.useState(false);
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');
  const handleTextChange = (inputText) => {
    setText(inputText);
  };
  const handleTextChange2 = (inputText) => {
    setText2(inputText);
  };
  const handleSubmit = () => {
    // Do something with the text value, e.g. send it to a server
    //technician
    // navigation.navigate('technicianHome');


      // Reset the navigation stack and navigate to the technician portal
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: 'technicianHome',params: {
        refreshData: 'example value',
       
      }, }],
    })
  );

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
      <Text>Sign into your account</Text>
      <Input w={{
      base: "75%",
      md: "25%"
    }}style={styles.field} 
    InputLeftElement={<Icon  size={5} ml="2" color="muted.400" />} placeholder="Name" />

      <Input w={{
      base: "75%",
      md: "25%"
    }} style={styles.field} 
    type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
            <Icon  size={5} mr="2" color="muted.400" />
          </Pressable>} placeholder="Password" />
      <Button style={styles.botton}
        title="Login as Technician"
        onPress={handleSubmit}
      />
      <Button style={styles.botton}
        title="Login as Client"
        onPress={handleSubmit2}
      />
      <Button style={styles.botton}
        title="Upload image bro"
        onPress={handleSubmit3}
      />
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
