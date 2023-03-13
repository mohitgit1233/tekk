import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text,Alert } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import Footer from './components/Footer';
import { AppStack } from './src/technician/stacks/AppStack';
import { AppStackClient } from './src/client/stacks/AppStackClient';


import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Login } from './src/login/Login'
import Splash from './src/Splash';
import React, { useState, useEffect } from 'react';
import AppContext from './AppContext';


const Tab = createMaterialTopTabNavigator();

// import jobFeed from './technician/JobPosts';
const Stack = createNativeStackNavigator();

export default function App() {


  const [text, setText] = useState('');
  const [text2, setText2] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loggedInUser,setLoggedInUser] = useState({
    id: "635cc7967007ac4c3cc1aabb",
    // id:"633a08d5dcc833764b361dc3",
    name: "Jane",
    isTechnician: true
  })
  

  // const handleTextChange = (inputText) => {
  //   setText(inputText);
  // };
  // const handleSubmit = () => {
  //   // Do something with the text value, e.g. send it to a server
  //   console.log(text);
  // };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('This is an alert message!');
    }, 1000);
  }, []);
  
  return (
    <>
    <AppContext.Provider value={{ loggedInUser, setLoggedInUser  }}>

    {isLoading ? <Splash /> :     <NavigationContainer>
      <NativeBaseProvider>

      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="technicianHome" component={AppStack} />
        <Stack.Screen name="clientHome" component={AppStackClient} />
      </Stack.Navigator>

      </NativeBaseProvider>

    </NavigationContainer>}
    </AppContext.Provider>



    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
