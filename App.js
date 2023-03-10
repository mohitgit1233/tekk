import 'expo-dev-client';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import { AppStack } from './src/technician/stacks/AppStack';
import { AppStackClient } from './src/client/stacks/AppStackClient';
import React from 'react';
import { Login } from './src/login/Login';
import { Registration } from './src/screens/Registration';
import { AuthContextProvider, UserAuth } from './src/context/AuthContext';

<<<<<<< HEAD
const Stack = createNativeStackNavigator();

export default function App() {
  const userAuth = UserAuth();
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <NativeBaseProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Registration"
              component={Registration}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="technicianHome"
              component={AppStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="clientHome"
              component={AppStackClient}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
    </AuthContextProvider>
=======

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Login } from './src/login/Login'
import Splash from './src/Splash';
import React, { useState, useEffect } from 'react';


const Tab = createMaterialTopTabNavigator();

// import jobFeed from './technician/JobPosts';
const Stack = createNativeStackNavigator();

export default function App() {


  const [text, setText] = useState('');
  const [text2, setText2] = useState('');
  const [isLoading, setIsLoading] = useState(true);


  const handleTextChange = (inputText) => {
    setText(inputText);
  };
  const handleSubmit = () => {
    // Do something with the text value, e.g. send it to a server
    console.log(text);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  
  return (
    <>
    {isLoading ? <Splash /> :     <NavigationContainer>
      <NativeBaseProvider>

      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="technicianHome" component={AppStack} />
        <Stack.Screen name="clientHome" component={AppStackClient} />
      </Stack.Navigator>

      </NativeBaseProvider>

    </NavigationContainer>}



    </>

>>>>>>> 432b79b2bfb5fcef2e7355d6d1f54aaaf017bf35
  );
}
