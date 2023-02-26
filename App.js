import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { AppStack } from './src/component/AppStack';

export default function App() {
  return (
    <NativeBaseProvider>
      
    
    <NavigationContainer>
      <AppStack></AppStack>
      </NavigationContainer>
      </NativeBaseProvider>
  )
  }