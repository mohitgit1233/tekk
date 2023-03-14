import { useState } from "react";
import {  Box, Radio, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {AsyncStorage} from 'react-native';

export const Registration = ({navigation}) => {
  const [email,setEmail] = useState('');
  const [name,setName] = useState('');
  const [phone,setPhone] = useState('');
  const [password,setPassword] = useState('');
  const [userType,setUserType] = useState([]);


  const handleSignUp = async () => {
    await createUserWithEmailAndPassword(auth,email,password).then(async (userCredentails) => {
      const user = userCredentails.user; 
      await updateProfile(user, {
        displayName: name,
      })
      await AsyncStorage.setItem('@userData', user)
    }).catch(error => alert(error.message))
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
              <FormControl.Label>Name</FormControl.Label>
                <Input value={name} onChangeText={text => setName(text)} variant="underlined" placeholder="Enter your Name" />
              </FormControl>
              <FormControl>
                <FormControl.Label>Email ID</FormControl.Label>
                  <Input value={email} onChangeText={text => setEmail(text)} variant="underlined" placeholder="Enter your Email" />
              </FormControl>
              <FormControl>
              <FormControl.Label>Phone</FormControl.Label>
                <Input value={phone} onChangeText={text => setPhone(text)} variant="underlined" placeholder="Enter your Phone" />
              </FormControl>
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input variant="underlined" value={password} onChangeText={text => setPassword(text)} type="password" secureTextEntry placeholder="Enter you Password"  />
              </FormControl>
              <FormControl>
                <FormControl.Label>Would you like to be:</FormControl.Label>
                  <Radio.Group name="exampleGroup" defaultValue="client" onChange={setUserType} value={userType}>
                    <HStack space={6}>
                      <Radio value="client" size="md" my={2}>
                        Client
                      </Radio>
                      <Radio value="technician" size="md" my={2}>Technician</Radio>
                    </HStack>
                  </Radio.Group>
              </FormControl>
              <Button onPress={handleSignUp} mt="2" colorScheme="indigo">
                Sign Up
              </Button>
              <HStack mt="6" justifyContent="center">
              <Text fontSize="sm" color="coolGray.600" _dark={{
              color: "warmGray.200"
            }}>
                Already have a acoount?.{" "}
              </Text>
              <Link _text={{
              color: "indigo.500",
              fontWeight: "medium",
              fontSize: "sm"
            }} onPress={() => navigation.navigate('Login')}>
                Sign In
              </Link>
            </HStack>
            </VStack>
          </Box>
        </Center>
      </Center>
  );
}

