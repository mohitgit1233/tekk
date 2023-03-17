import { useState } from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserAuth } from "../context/AuthContext";

export const Login = ({navigation}) => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const { signIn,setUser, setToken, promptAsync } = UserAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    await signIn(email,password).then(async (userCredentails) => {
      await userCredentails.user.getIdToken().then(async token=>{
          await fetch('http://10.0.0.99:5001/api/v1/login',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'authorization': `Bearer ${token}` },
            body: JSON.stringify({})
          }).then((resp) => resp.json())
          .then(async (userData) => {
            if(userData.data.user.role_type == "client") {
              setToken(token)
              setUser(userData.data.user)
              await AsyncStorage.setItem('@userData', JSON.stringify(userData.data.user));
              navigation.navigate("clientHome");
            } else if(userData.data.user.role_type == "technician"){
              setToken(token)
              setUser(userData.data.user)
              await AsyncStorage.setItem('@userData', JSON.stringify(userData.data.user));
              navigation.navigate("technicianHome");
            }
          })
          .catch((error) => alert(error));
      }) 
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
      onPress={() => { promptAsync() }} mt="2" colorScheme="indigo">
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

