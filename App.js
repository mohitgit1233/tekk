import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text} from 'react-native';
import { NativeBaseProvider } from 'native-base';

import Footer from './components/Footer';
import { AppStack } from './src/technician/stacks/AppStack';
import { AppStackClient } from './src/client/stacks/AppStackClient';


import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import AppContext from './AppContext';
import Splash from './src/Splash';
import { Login } from './src/login/Login';
import { LogBox } from 'react-native'; // for newer versions (0.62+)

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');
  const myAppStackComponent = <AppStack />;
  const myAppStackClientComponent = <AppStackClient />;
  const [isLoading, setIsLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState({
    id: "635cc7967007ac4c3cc1aabb",
    name: "Jane",
    isTechnician: true
  })

  useEffect(() => {
    // For React Native 0.62+
LogBox.ignoreAllLogs(true);
// LogBox.ignoreLogs([/Warning: .*/]);


    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  
  return (
    <>
      <AppContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        {isLoading ? (
          <Splash />
        ) : (
          <NavigationContainer>
            <NativeBaseProvider>
              <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="technicianHome" component={AppStack} options={{ headerShown: false }} />
                <Stack.Screen name="clientHome" component={AppStackClient} options={{ headerShown: false }} />
              </Stack.Navigator>
            </NativeBaseProvider>
          </NavigationContainer>
        )}
      </AppContext.Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
