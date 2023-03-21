import { useState, useEffect, useRef } from "react";
import { Box, Radio, Heading, VStack, FormControl, Input, Link, HStack, NativeBaseProvider, Modal, Center } from "native-base";
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fontisto } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { Pressable, StyleSheet, Text } from 'react-native';
import { View, TextInput, Button,Image,TouchableOpacity } from 'react-native';
import React, {  useContext } from 'react';
import { UserAuth } from "../context/AuthContext";

import { StatusBar } from 'expo-status-bar';

export const Login = ({navigation}) => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [userType, setUserType] = useState('');
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { signIn,setUser, user,setToken, token, googleAuthentication,promptAsync } = UserAuth();


  const handlePress = () => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'You have successfully completed the action.',
      visibilityTime: 2000,
      position: 'bottom'
    });
  };


  useEffect(() =>{

    if(userType != '') {
      const user_Google_Login = async () => {
        await fetch('http://10.0.0.99:5001/api/v1/google-user-login',{
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'authorization': `Bearer ${token}` },
          body: JSON.stringify({
            role_type: userType
          })
        }).then((resp) => resp.json())
        .then(async (userData) => {
          console.log(userData)
          if(userData.data.role_type == "client") {
            setUser(userData.data)
            //await AsyncStorage.setItem('@userData', JSON.stringify(userData.data));
            navigation.navigate("clientHome");
          } else if(userData.data.role_type == "technician"){
            setToken(token)
            setUser(userData.data)
            //await AsyncStorage.setItem('@userData', JSON.stringify(userData.data));
            navigation.navigate("technicianHome");
          }
        })
        .catch((error) => alert(error));
      }

      user_Google_Login()
    }


  },[userType]);

  
  useEffect(() => {

    if(googleAuthentication){
      const googleLogin = async () => {
        await fetch('http://10.0.0.99:5001/api/v1/google-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        })
          .then((resp) => resp.json())
          .then(async (userData) => {
              console.log(userData.data.user)
            if(userData.message == "usernotindb") {
              setModalVisible(true)
            }
            else if (userData.data.user.role_type == 'client') {
              setUser(userData.data.user);
              /*await AsyncStorage.setItem(
                '@userData',
                JSON.stringify(userData.data.user)
              );*/
              navigation.navigate('clientHome');
            } else if (userData.data.user.role_type == 'technician') {
              setUser(userData.data.user);
             /* await AsyncStorage.setItem(
                '@userData',
                JSON.stringify(userData.data.user)
              );*/
              navigation.navigate('technicianHome');
            }
          })
          .catch((error) => alert(error));        
      }
      googleLogin();
    }
    
  },[googleAuthentication]);

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
            console.log(userData)
            if(userData.data.user.role_type == "client") {
              setToken(token)
              setUser(userData.data.user)
              //await AsyncStorage.setItem('@userData', JSON.stringify(userData.data));
              navigation.navigate("clientHome");
            } else if(userData.data.user.role_type == "technician"){
              setToken(token)
              setUser(userData.data.user)
              //await AsyncStorage.setItem('@userData', JSON.stringify(userData.data));
              navigation.navigate("technicianHome");
            }
          })
          .catch((error) => alert(error));
      }) 
    })
    .catch((error) => alert(error.message));
  }

  return (
    <>
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
              <Button onPress={handleSignIn} mt="2" colorScheme="indigo" title="Sign in">
              </Button>
    
              <Button onPress={() => { promptAsync() }} mt="2" colorScheme="indigo" title="Sign in using Google"> 
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
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
      <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Please choose your role</Modal.Header>
          <Modal.Body>
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
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal.Content>
      </Modal>


      </>
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
    marginBottom:40,
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
