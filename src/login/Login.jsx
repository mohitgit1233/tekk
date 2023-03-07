import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { AppStack } from '../component/AppStack';
import { Chat } from '../screens/Chat';
import { AppStackClient } from '../component/AppStackClient';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';


const Tab = createMaterialTopTabNavigator();

// import jobFeed from './technician/JobPosts';
const Stack = createNativeStackNavigator();

export const Login = () => {
  const navigation = useNavigation();

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
    navigation.navigate('technicianHome');
    //client
    // navigation.navigate('clientHome');

    console.log(text);
  };
  const handleSubmit2 = () => {
    // Do something with the text value, e.g. send it to a server
    //technician
    // navigation.navigate('technicianHome');
    //client
    navigation.navigate('clientHome');

    console.log(text);
  };
  return (

    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Sign into your account</Text>
      <TextInput
        value={text}
        style={styles.field}
        onChangeText={handleTextChange}
        placeholder="email"
      />
      <TextInput
        value={text2}
        onChangeText={handleTextChange2}
        placeholder="password"
        style={styles.field}
      />
      <Button style={styles.botton}
        title="Login as Technician"
        onPress={handleSubmit}
      />
      <Button style={styles.botton}
        title="Login as Client"
        onPress={handleSubmit2}
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
    border: '1px solid black',
    margin:'1rem',
    padding:'10px'
    
  },
  botton:{
    margin:'1rem',
    padding:'10px'
  }
});
