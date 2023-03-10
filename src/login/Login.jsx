import { useState, useEffect } from "react";
import * as GoogleAuthentication from 'expo-google-app-auth';
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserAuth } from "../context/AuthContext";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const Login = ({navigation}) => {
  GoogleSignin.configure({
    webClientId:
      '289621286274-cbtdk9v2714kvbed74t94j5oftt8ksbd.apps.googleusercontent.com',
  });

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const { signIn,setUser } = UserAuth();

  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    const user_sign_in =  auth().signInWithCredential(googleCredential);
    user_sign_in.then(user => {
      setUser(user.user)
      navigation.navigate('clientHome');
    }).catch(error => console.log(error))
  }


  const handleSignIn = async (e) => {
    e.preventDefault();
    await signIn(email,password).then(async (userCredentails) => {
      setUser(userCredentails.user);
      await AsyncStorage.setItem('@userData', JSON.stringify(userCredentails.user));
      if(userCredentails.user){
        navigation.navigate("clientHome")
      }
      
    })
    .catch((error) => alert(error.message));
  }

  return (
      <Center flex={1}>
        <Center w="100%">
          <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{ color: "warmGray.50"}}>
            Tekk
          </Heading>
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Email ID</FormControl.Label>
                  <Input value={email} onChangeText={text => setEmail(text)} variant="underlined" placeholder="Enter you Email" />
              </FormControl>
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input variant="underlined" value={password} onChangeText={text => setPassword(text)} type="password" secureTextEntry placeholder="Enter you Password"  />
                <Link _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.500"
              }} alignSelf="flex-end" mt="1">
                  Forget Password?
                </Link>
              </FormControl>
              <Button onPress={handleSignIn} mt="2" colorScheme="indigo">
                Sign in
              </Button>

              <Button title="Google Sign-In"
      onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))} mt="2" colorScheme="indigo">
                Sign in using Google
              </Button>

              <HStack mt="6" justifyContent="center">
              <Text fontSize="sm" color="coolGray.600" _dark={{
              color: "warmGray.200"
            }}>
                I'm a new user.{" "}
              </Text>
              <Link _text={{
              color: "indigo.500",
              fontWeight: "medium",
              fontSize: "sm"
            }} onPress={() => navigation.navigate('Registration')}>
                Sign Up
              </Link>
            </HStack>
            </VStack>
          </Box>
        </Center>
      </Center>
  );
}

