import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import { AppStack } from './src/technician/stacks/AppStack';
import { AppStackClient } from './src/client/stacks/AppStackClient';
import React from 'react';
import { Login } from './src/login/Login';
import { Registration } from './src/screens/Registration';
import { AuthContextProvider, UserAuth } from './src/context/AuthContext';

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
  );
}
