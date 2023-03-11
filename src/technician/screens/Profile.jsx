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



import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const Profile = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
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

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}

