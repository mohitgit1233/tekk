import { useState } from "react";
import { KeyboardAvoidingView, Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigation = useNavigation();


  const handleSignIn = async () => {

    await signInWithEmailAndPassword(auth,email,password).then(async (userCredentails) => {
      const user = userCredentails.user;
      console.log(user);
      await AsyncStorage.setItem('@userData', JSON.stringify(user))
      navigation.navigate("clientHome");
    }).catch(error => alert(error.message))
  }

  return (
      <Center flex={1}>
        <Center w="100%">
          <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{ color: "warmGray.50"}}>
            Tekkkkk
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

