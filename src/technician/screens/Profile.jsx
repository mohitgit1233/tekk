// import { Button, FormControl, Label, Heading, HStack, Input, VStack } from 'native-base';

// export const Profile = ({ navigation }) => {
//   return (
//     <VStack p="4">
//       <Heading>Profile</Heading>

//       <FormControl>
//         <FormControl.Label>Name</FormControl.Label>
//         <Input placeholder="Enter your name" />
//       </FormControl>

//       <FormControl>
//         <FormControl.Label>Company Name</FormControl.Label>
//         <Input placeholder="Enter your company name" />
//       </FormControl>

//       <FormControl>
//         <FormControl.Label>Work Experience</FormControl.Label>
//         <Input placeholder="Enter your work experience" />
//       </FormControl>

//       <FormControl>
//         <FormControl.Label>Your Skills</FormControl.Label>
//         <Input placeholder="Enter your skills" />
//       </FormControl>

//       <FormControl>
//         <FormControl.Label>Certificate Upload</FormControl.Label>
//         <HStack space={2}>
//           <Button>Choose File</Button>
//           <Input placeholder="No file chosen" isReadOnly />
//         </HStack>
//       </FormControl>

//       <FormControl>
//         <FormControl.Label>ID Upload</FormControl.Label>
//         <HStack space={2}>
//           <Button>Choose File</Button>
//           <Input placeholder="No file chosen" isReadOnly />
//         </HStack>
//       </FormControl>

//       <Button mt="4" onPress={() => navigation.goBack()}>Save Changes</Button>
//     </VStack>
//   );
// };

// import React, { useState } from 'react';
import { Button, Image, View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { updateTechnicianImage } from '../../../services/api';
import { SOCKET_API } from '../../../services/api_config';
import React, { useState, useEffect,useContext } from 'react';
import { Input, Stack, FormControl, Box,Text, VStack, Pressable,  Center,  InputGroup, InputLeftAddon, InputRightAddon } from 'native-base';
import AppContext from '../../../AppContext';

export const Profile = () => {
  const { loggedInUser, setLoggedInUser } = useContext(AppContext);
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState([]);
  const [skills, setSkills] = useState(['']);
  // const tech_id = '63f17ce257353e03afc8f124';

  const handleAdd=()=>{
    const abc=[...skills,'']
    setSkills(abc)
}

  const handleChange = (e,i) => {
    const inputData = [...skills]
    inputData[i] = e.target.value
    setSkills(inputData)
  }

  const handleDelete = (index) => {
    const deleteVal=[...skills]
    deleteVal.splice(index,1)
    setSkills(deleteVal)  
  }

  const updateData = (e) =>{
    setUserData([...userData, [e.target.name] = [e.target.value]])
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const updateProfileImage = async (tech_id, imageUri) => {
    console.log("updateProfileImage calledddd");
    const formData = new FormData();
    formData.append('image1', {
      uri: imageUri,
      name: 'profile-image.jpg',
      type: 'image/jpeg',
    });
    console.log("r1 calledddd");

    const data = await updateTechnicianImage(loggedInUser.id, formData)
    console.log(data);
    console.log("success upload");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
      <Center>
            <Image style={styles.imagee} size={100} borderRadius={100} source={{
            uri: loggedInUser.picture
          }} alt="Alternate Text" />
          <Button title="Update Profile photo" onPress={pickImage} />
      </Center>

      <FormControl mb="2" padding={2}>
        <FormControl.Label>Name*</FormControl.Label>
        <Input name="name" value={loggedInUser.name} onChange={(e)=>updateData(e)} variant="underlined" p={2} placeholder="Name" />
      </FormControl>

      <FormControl mb="2" padding={2}>
        <FormControl.Label>Company name (optional)</FormControl.Label>
        <Input name="company" onChange={(e)=>updateData(e)} variant="underlined" p={2} placeholder="Company name" />
      </FormControl>

      <FormControl mb="2" padding={2}>
        <FormControl.Label>Location*</FormControl.Label>
        <Input name="address" value={loggedInUser.name} onChange={(e)=>updateData(e)} variant="underlined" p={2} placeholder="Location" />
      </FormControl>

      <FormControl paddingLeft={2} padddingRight={2}>
            <FormControl.Label>Skills</FormControl.Label>

            { 
              skills.map((data,i) => {
                return (

                  <InputGroup key={i} w={{
                  base: "100%",
                }}>
                    <Input w={{
                    base: "100%",
                    md: "100%"
                  }} value={data} onChange={e=>handleChange(e,i)}   mb={1} placeholder="Skills" InputRightElement={ <Pressable onPress={() => handleDelete(i)}><Text>x</Text></Pressable> } />
                    
                  </InputGroup>
                )
              })
            }
            <Button style={{flex: 1, justifyContent: 'flex-end'  }} title='+' onPress={()=>handleAdd()}>+</Button>
        </FormControl> 

      <TouchableOpacity style={styles.botton} onPress={()=>{}}>
          <Text style={styles.btntxt}>Update</Text>
      </TouchableOpacity>
      
      { /*image && <Button title="Submit" onPress={() => updateProfileImage(loggedInUser.id, image)} /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

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
    marginLeft: 10,
    marginRight: 10,
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
