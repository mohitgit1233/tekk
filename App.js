import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import Footer from './components/Footer';
import { AppStack } from './src/component/AppStack';
import { Chat } from './src/screens/Chat';
// import jobFeed from './technician/JobPosts';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
      <AppStack />
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
