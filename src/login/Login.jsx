import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Input, NativeBaseProvider } from 'native-base';
// import { AppStack } from '../technician/stacks/AppStack';
import { Chat } from '../technician/screens/Chat';
// import { AppStackClient } from '../client/stacks/AppStackClient';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, TextInput, Button,Image,TouchableOpacity } from 'react-native';
import React, { useState, useContext } from 'react';
import AppContext from '../../AppContext';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-ionicons';
import { CommonActions } from '@react-navigation/native';
import {login} from '../../services/api'

import Toast from 'react-native-toast-message';


const Tab = createMaterialTopTabNavigator();

// import jobFeed from './technician/JobPosts';
const Stack = createNativeStackNavigator();

export const Login = () => {
  // const { show } = SuccessToast();

  const handlePress = () => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'You have successfully completed the action.',
      visibilityTime: 2000,
      position: 'bottom'
    });
  };
  const { loggedInUser, setLoggedInUser } = useContext(AppContext);

  const navigation = useNavigation();
  const [show2, setShow2] = React.useState(false);
  const [text, setText] = useState("a@gmail.com");
  const [text2, setText2] = useState("12345678");

  const handleSubmit = async () => {
    // Do something with the text value, e.g. send it to a server
    //technician
    // navigation.navigate('technicianHome');
    body1 = {
      "email": text,
      "password": text2
    }
    const json1 = await login(null, body1);
    console.log(json1);
    if ( json1.error === false){
      console.log("4444444444444444");
      console.log(json1.data.name);
      if (json1.isTechnician===true){
        setLoggedInUser({
          id: json1.data._id,
          name: json1.data.name,
          isTechnician: json1.data.isTechnician
        })
      // Reset the navigation stack and navigate to the technician portal
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'technicianHome',params: {
            refreshData: 'example value',
           
          }, }],
        })
      );
      }else{
        setLoggedInUser({
          id: json1.data._id,
          name: json1.data.name,
          isTechnician: json1.data.isTechnician
        })

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'clientHome' }],
          })
        );
      }
    }else {
      console.log("login failed");
    }





    console.log(text);
  };
  const handleSubmit2 = () => {
    // Do something with the text value, e.g. send it to a server
    //client
    // navigation.navigate('clientHome');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'clientHome' }],
      })
    );
  };
  const handleSubmit3 = () => {
    // Do something with the text value, e.g. send it to a server
    //client
    navigation.navigate('imageUpload');
    
  };



  return (

    <View style={styles.container}>
     
      <Image source={require('../../assets/loginLogog.png')} style={styles.imagee}/>

      <StatusBar style="auto" />
      
      
      {/* <Text>Use email: as@gmail.com for client login</Text> */}


      <View>
      <Text style={styles.label}>Email</Text>
      
      <Input w={{
      base: "75%",
      md: "25%"
    }}style={styles.field} 
     placeholder="Email" onChangeText={(e)=>setText(e)} defaultValue={text} />

    
    <Text style={styles.label}>Password</Text>

      <Input w={{
      base: "75%",
      md: "25%"
    }} style={styles.field} 
    type={show2 ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow2(!show2)}>
            {/* <Icon  size={5} mr="2" color="red" /> */}
          </Pressable>} placeholder="Password"   onChangeText={(e)=>setText2(e)} defaultValue={text2} />

  </View>
      {/* <Button style={styles.botton}
        title="Login"
        onPress={handleSubmit}
      /> */}
      <TouchableOpacity style={styles.botton} onPress={handleSubmit}>
        <Text style={styles.btntxt}>Login</Text>
      </TouchableOpacity>
       {/* <Button title="Show Toast" onPress={handlePress} /> */}
       {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}

      {/* <Button style={styles.botton}
        title="Login as Client"
        onPress={handleSubmit2}
      /> */}
      {/* <Button style={styles.botton}
        title="Upload image bro"
        onPress={handleSubmit3}
      /> */}

    <View style= {{display:'flex',flexDirection:'row',alignItems:'center'}}>
    <Text style={{marginRight:5}} >New User?</Text><TouchableOpacity ><Text style={{textDecorationLine:'underline'}}>Sign up here.</Text></TouchableOpacity>
    </View>

    <Text style={{fontSize: 20, marginTop:30}}> - OR - </Text>
    <Text style={{ marginTop:20}}> Sign in using: </Text>
    <View style ={styles.iccons}>
    <TouchableOpacity style={{borderWidth:1,borderRadius:50,padding:15,margin:15,borderColor:'#0D937D'}} ><Fontisto name="google" size={35}  color={'#0D937D'}/></TouchableOpacity>
    {/* <TouchableOpacity style={{borderWidth:1,borderRadius:50,padding:15,margin:15,borderColor:'#0D937D'}} ><Fontisto name="facebook" size={30}  color={'#0D937D'}/></TouchableOpacity> */}
    <TouchableOpacity style={{borderWidth:1,borderRadius:50,padding:15,margin:15,borderColor:'#0D937D'}} ><Fontisto name="apple" size={35} color={'#0D937D'}/></TouchableOpacity>
    </View>
    
    </View>

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
