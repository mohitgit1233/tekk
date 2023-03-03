import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Account } from '../screens/Account';
import { Activities } from '../screens/Activities';
import { Chat } from '../screens/Chat';
import { JobPosts } from '../screens/JobPosts';
import { MyJob } from '../screens/MyJobs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {AspectRatio,Box,Button,HStack,Image,Text,VStack} from 'native-base';
import SearchFilter from '../../components/SearchFilter';
import SearchInput from '../../components/SearchInput';
import JobContainer from '../container/JobContainer';
import ViewOffer from '../technician/ViewOffer';
import SendOfferButton from '../technician/SendOfferButton';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export const AppStack = () => {
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
     <Stack.Screen name='SendOffer' component={SendOfferButton}></Stack.Screen>
     <Stack.Screen name='ViewOffer' component={ViewOffer}></Stack.Screen>
    </Stack.Navigator>
  );
};

export const TabStack = () => {
  return (
    <Tab.Navigator   screenOptions={{
        headerTitleAlign: 'left',
      }} >
      
      <Tab.Screen name="Job Posts" component={JobPosts} />
      
      <Tab.Screen name="Activities" component={Activities} />
      
      <Tab.Screen name="My Jobs" component={MyJob} />

      <Tab.Screen name="Chat" component={Chat} />
      
      <Tab.Screen name="Account" component={Account} />
    
    </Tab.Navigator>
  );
};
