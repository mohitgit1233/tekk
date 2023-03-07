import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {AspectRatio,Box,Button,HStack,Image,Text,VStack} from 'native-base';
import SearchFilter from '../../components/SearchFilter';
import SearchInput from '../../components/SearchInput';
import JobContainer from '../container/JobContainer';
import MyPosts from '../client/myPosts';
import Offers from '../client/Offers';

import AllChats from '../client/allChats';

import ClientAccount from '../client/clientAccount';
import AllOffers from '../client/AllOffers';
import CreatePost from '../client/CreatePost';
import PostDetails from '../client/PostDetails';

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
     <Stack.Screen name='AllOffers' component={AllOffers}></Stack.Screen>
     <Stack.Screen name='CreatePost' component={CreatePost}></Stack.Screen>
     <Stack.Screen name='MyPosts' component={MyPosts}></Stack.Screen>
     <Stack.Screen name='PostDetails' component={PostDetails}></Stack.Screen>
    </Stack.Navigator>
  );
};

export const TabStack = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === 'Job Posts') {
          return (
            <Ionicons
              name={
                 'ios-home'
              }
              size={size}
              color={color}
            />
          );
        }
        else if (route.name === 'Chats') {
          return (
            <Ionicons
              name={'chatbox'}
              size={size}
              color={color}
            />
          );
        }
        else if (route.name === 'Account') {
          return (
            <Ionicons
              name={'person'}
              size={size}
              color={color}
            />
          );
        }else if (route.name === 'Requests') {
            return (
              <Ionicons
                name={'briefcase'}
                size={size}
                color={color}
              />
            );
          }
      },
      tabBarInactiveTintColor: 'gray',
      tabBarActiveTintColor: 'tomato',
    })}
  >
      
      <Tab.Screen name="Job Posts" component={MyPosts} />
      
      <Tab.Screen name="Requests" component={Offers} />
      
      <Tab.Screen name="Chats" component={AllChats} />
      
      <Tab.Screen name="Account" component={ClientAccount} />
    
    </Tab.Navigator>
  );
};
