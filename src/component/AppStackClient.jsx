import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {AspectRatio,Box,Button,HStack,Image,Text,VStack} from 'native-base';
import SearchFilter from '../../components/SearchFilter';
import SearchInput from '../../components/SearchInput';
import JobContainer from '../container/JobContainer';
import myPosts from '../client/myPosts';
import requests from '../client/requests';
import allChats from '../client/allChats';
import clientAccount from '../client/clientAccount';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export const AppStackClient = () => {
  return (
    <Stack.Navigator>
      
      <Stack.Screen
        name="Tekk"
       
        component={TabStack}
       
        options={{
          headerStyle: {
            backgroundColor: 'orange',
          },
          headerTintColor: 'white',
       
        }}
      />
     <Stack.Screen name='Search' component={SearchInput}></Stack.Screen>
     <Stack.Screen name='JobContainer' component={JobContainer}></Stack.Screen>
    </Stack.Navigator>
  );
};

export const TabStack = () => {
  return (
    <Tab.Navigator   screenOptions={{
        headerTitleAlign: 'left',
      }} >
      
      <Tab.Screen name="Job Posts" component={myPosts} />
      
      <Tab.Screen name="Requests" component={requests} />
      
      <Tab.Screen name="Chats" component={allChats} />
      
      <Tab.Screen name="Account" component={clientAccount} />
    
    </Tab.Navigator>
  );
};
