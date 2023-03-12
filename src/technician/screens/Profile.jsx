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

import React, { useState } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const Profile = () => {
  const [image, setImage] = useState(null);
  const tech_id = '63f17ce257353e03afc8f124';

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
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      name: 'profile-image.jpg',
      type: 'image/jpeg',
    });
    const response = await fetch(`http://localhost:5001/api/v1/technicians/${tech_id}`, {
      method: 'PUT',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      {image && <Button title="Submit" onPress={() => updateProfileImage(tech_id, image)} />}
    </View>
  );
};
