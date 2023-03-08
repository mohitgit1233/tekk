import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import Footer from './components/Footer';
import { AppStack } from './src/component/AppStack';
import { AppStackClient } from './src/component/AppStackClient';

import { Chat } from './src/screens/Chat';
import { Activities } from './src/screens/Activities';

import { MyJobs } from './src/screens/MyJobs';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Login } from './src/login/Login';
import { Registration } from './src/screens/Registration';

const Tab = createMaterialTopTabNavigator();

// import jobFeed from './technician/JobPosts';
const Stack = createNativeStackNavigator();

export default function App() {
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');
  const handleTextChange = (inputText) => {
    setText(inputText);
  };
  const handleSubmit = () => {
    // Do something with the text value, e.g. send it to a server
    console.log(text);
  };
  return (
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
