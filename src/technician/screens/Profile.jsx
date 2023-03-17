import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { updateTechnicianImage } from '../../../services/api';
import { SOCKET_API } from '../../../services/api_config';
import React, { useState, useEffect,useContext } from 'react';
import { Input, Stack, FormControl } from 'native-base';
import { UserAuth } from '../../context/AuthContext';

export const Profile = () => {
  
  const { user } = UserAuth();
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

    const data = await updateTechnicianImage(user._id, formData)
    console.log(data);
    console.log("success upload");
  };

  return (
    <>
    <FormControl>
      <Stack space={5}>
        <Stack>
          <FormControl.Label>Username</FormControl.Label>
          <Input variant="underlined" p={2} placeholder="Username" />
        </Stack>
        <Stack>
          <FormControl.Label>Password</FormControl.Label>
          <Input variant="underlined" p={2} placeholder="Password" />
        </Stack>
      </Stack>
    </FormControl>


    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      {image && <Button title="Submit" onPress={() => updateProfileImage(user._id, image)} />}
    </View>
    </>
  );
};
