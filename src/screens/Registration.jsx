import { useState } from "react";
import {  Box, Radio, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";
import { auth } from "../firebase";
import {  StyleSheet, TouchableOpacity } from 'react-native';

import {createUserWithEmailAndPassword , updateProfile } from 'firebase/auth'
import { useNavigation, useRoute } from '@react-navigation/native';
import { API_BASE_URL } from "../../services/api_config";

export const Registration = () => {
  const [email,setEmail] = useState('');
  const [name,setName] = useState('');
  const [phone,setPhone] = useState('');
  const [password,setPassword] = useState('');
  const [userType,setUserType] = useState([]);
  const navigation = useNavigation();

  const handleSignUp = async () => {
    await createUserWithEmailAndPassword(auth,email,password).then(async (userCredentails) => {
      const user = userCredentails.user; 
      await updateProfile(user, {
        displayName: name,
      })
         await fetch(`${API_BASE_URL}/register`,{
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            email: email,
            name: name,
            phone: phone,
            password: password,
            firebase_uid: user.uid,
            role_type: userType
          })
        }).then((resp) => resp.json())
        .then((userData) => {
          if(userData.message == "user added success") {
            navigation.navigate("Login");
          }
        })
        .catch((error) => alert(error));
    }).catch(error => alert(error.message))
  }

  return (
      <Center flex={1} style={styles.container}>
        <Center w="100%">
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
              <TouchableOpacity style={styles.botton} onPress={handleSignUp}>
                <Text style={styles.btntxt}>Sign Up</Text>
              </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F8F5',
    alignItems: 'center',
    // justifyContent: 'center',
   
  },
  iccons:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
    
  },
  imagee:{
    marginTop:60,
    marginBottom:20,
    width: 120,
    height: 120,
    
  },
  label:{
    marginBottom:5,
    marginTop:20
  },
  field:{
    // fontSize:'x-large',
    // border: '1% solid black',
    marginBottom:'2%',
    fontSize:15
   
  },
  botton:{
    backgroundColor: '#0D937D',
    paddingVertical: 15,
    paddingHorizontal: 100,
    // borderRadius: 30,
    marginTop: 20,
    marginBottom: 20,
  },
  btntxt:{
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  }

});
