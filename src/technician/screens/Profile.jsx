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
import { Button, Image, View,Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { updateTechnicianImage } from '../../../services/api';
import { SOCKET_API } from '../../../services/api_config';
import React, { useState, useEffect,useContext } from 'react';
import AppContext from '../../../AppContext';

export const Profile = () => {
  const { loggedInUser, setLoggedInUser } = useContext(AppContext);
  const [image, setImage] = useState(null);
  // const tech_id = '63f17ce257353e03afc8f124';

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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{loggedInUser.name}</Text>
      <Text>{loggedInUser.email}</Text>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      {image && <Button title="Submit" onPress={() => updateProfileImage(loggedInUser.id, image)} />}
    </View>
  );
};
