import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-ionicons';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function Activities() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Activities</Text>
    </View>
  );
}

function MyJobs() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>My Jobs</Text>
    </View>
  );
}

function Chats() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Chats</Text>
    </View>
  );
}

function Account() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Account</Text>
    </View>
  );
}
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
          <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Job Feed') {
              return (
                <Ionicons
                  name={
                     'ios-home'
                  }
                />
              );
            } else if (route.name === 'Activities') {
              return (
                <Ionicons
                  name={'ios-list'}
                  size={size}
                  color={color}
                />
              );
            }
            else if (route.name === 'My Jobs') {
              return (
                <Ionicons
                  name={'briefcase'}
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
            }
          },
          tabBarInactiveTintColor: 'gray',
          tabBarActiveTintColor: 'tomato',
        })}
      >
        <Tab.Screen
          name="Job Feed"
          component={HomeScreen}
        />
        <Tab.Screen name="Activities" component={Activities} />
        <Tab.Screen name="My Jobs" component={MyJobs} />
        <Tab.Screen name="Chats" component={Chats} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}