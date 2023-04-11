import { useState, useEffect, useRef } from "react";
import { Box, Radio, Heading, VStack, FormControl, Input, Link, HStack, NativeBaseProvider, Modal, Center } from "native-base";
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fontisto } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { Pressable, StyleSheet, Text } from 'react-native';
import { View, TextInput, Button,Image,TouchableOpacity } from 'react-native';
import React, {  useContext } from 'react';
import { UserAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../../services/api_config";
import auth from '@react-native-firebase/auth';
import { StatusBar } from 'expo-status-bar';

export const Login = ({navigation}) => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [userType, setUserType] = useState('');
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { signIn, onGoogleButtonPress, setToken,token, setUser, googleAuthentication, setgoogleAuthentication } = UserAuth();
  //const { signIn,setUser, user,setToken, token, /*googleAuthentication, promptAsync*/ } = UserAuth();


  const handlePress = () => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'You have successfully completed the action.',
      visibilityTime: 2000,
      position: 'bottom'
    });
  };

  const googleLogin = async () => {
    await onGoogleButtonPress().then(async resp =>{
      const {token} = await auth().currentUser.getIdTokenResult();
      setToken(token)
      //console.log(resp)
      setgoogleAuthentication(true)
    })
  }


  useEffect(() =>{

    if(userType != '') {
      const user_Google_Login = async () => {
        await fetch(`${API_BASE_URL}/google-user-login`,{
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'authorization': `Bearer ${token}` },
          body: JSON.stringify({
            role_type: userType
          })
        }).then((resp) => resp.json())
        .then(async (userData) => {
          if(userData.data.role_type == "client") {
            setUser(userData.data)
            //await AsyncStorage.setItem('@userData', JSON.stringify(userData.data));
            setModalVisible(false)
            navigation.navigate("clientHome");
          } else if(userData.data.role_type == "technician"){
            setToken(token)
            setUser(userData.data)
            setModalVisible(false)
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
        await fetch(`${API_BASE_URL}/google-login`, {
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
    await signIn(email,password).then(async (userCredentials) => {
      await userCredentials.user.getIdToken().then(async token=>{
        await fetch(`${API_BASE_URL}/login`,{
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

    }).catch((error) => alert(error.message)); 
  }

  return (
    <>
      <Center flex={1} style={styles.container}>
        <Center w="100%">
            <Image source={require('../../assets/loginLogog.png')} style={styles.imagee}/>
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <VStack space={3} mt="1">
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
              <TouchableOpacity style={styles.botton} onPress={handleSignIn}>
                <Text style={styles.btntxt}>Sign In</Text>
              </TouchableOpacity>
              <HStack space={3} justifyContent="center" flexWrap={'wrap'}>
                <Center>
                  <Text fontSize="sm" color="coolGray.600" _dark={{
                color: "warmGray.200"
              }}>
                  Don't have an account?.{"\n "}
                </Text>
                </Center>
              <Center>
              <Link _text={{
              color: "black",
              fontWeight: "medium",
              fontSize: "sm"
            }} style={{flex:1}} onPress={() => navigation.navigate('Registration')}>
                Register here
              </Link>
              </Center>

            </HStack>
            <Center>
             <Text style={{fontSize: 20}}> --- OR --- </Text>
            </Center>

            <TouchableOpacity style={styles.botton} onPress={googleLogin}>
                <Text style={styles.btntxt}> Gmail </Text>
            </TouchableOpacity>

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
