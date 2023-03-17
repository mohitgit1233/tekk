import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { AuthContextProvider, UserAuth } from './src/context/AuthContext';
import { Login } from './src/login/Login';
import { Registration } from './src/screens/Registration';
import Splash from './src/Splash';
import { AppStack } from './src/technician/stacks/AppStack';
import { AppStackClient } from './src/client/stacks/AppStackClient';

const Stack = createNativeStackNavigator();

export default function App() {
  const userAuth = UserAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <AuthContextProvider>
        {isLoading ? (
          <Splash />
        ) : (
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
        )}
      </AuthContextProvider>
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
