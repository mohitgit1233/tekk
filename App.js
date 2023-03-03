import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import Footer from './components/Footer';
import { AppStack } from './src/component/AppStack';
import { Chat } from './src/screens/Chat';
import { AppStackClient } from './src/component/AppStackClient';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

// import jobFeed from './technician/JobPosts';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
      <>
   
   <Tab.Navigator
     initialRouteName="Posts"

     screenOptions={{

       tabBarIndicatorStyle: { backgroundColor: '#2c3e50', height: 2 },

       tabBarLabelStyle: {  fontSize: 13,textTransform: 'none' },
     }}
   >
     
     <Tab.Screen
       name="Posts"
       component={AppStack}
       options={
           { tabBarLabel: 'Technician' }
       }
     />
     <Tab.Screen
       name="TvScreen"
       component={AppStackClient}
       
       options={{ tabBarLabel: 'Client' }}
     />

   </Tab.Navigator>
 </>
      {/* <AppStack /> */}
        {/* <Stack.Navigator>
          <Stack.Screen name="Jobs Posts" component={jobFeed} />
        </Stack.Navigator> */}
        {/* <Footer /> */}
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
