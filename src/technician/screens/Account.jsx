import { AspectRatio, Box, Button, HStack, Image, Text, VStack } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
// import { Reload } from 'react-native/Libraries/Reload/Reload';
import { CommonActions } from '@react-navigation/native';
import { UserAuth } from '../../context/AuthContext';

export const Account = ({ navigation }) => {
  const { logout } = UserAuth();
  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleJobHistoryPress = () => {
    navigation.navigate('JobHistory');
  };

  const handleNotificationsPress = () => {
    navigation.navigate('Notifications');
  };

  const handleLogoutPress = () => {
    logout().then(()=>{
      navigation.replace("Login");
    }).catch(error => alert(error.message));
    
    /*
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );*/
  };

  return (
    <VStack flex={1} p={2}>
      <TouchableOpacity onPress={handleProfilePress}>
        <Box borderBottomWidth={1} borderBottomColor="gray.300" py={3}>
          <Text fontSize="lg">Profile</Text>
        </Box>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleJobHistoryPress}>
        <Box borderBottomWidth={1} borderBottomColor="gray.300" py={3}>
          <Text fontSize="lg">Job History</Text>
        </Box>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNotificationsPress}>
        <Box borderBottomWidth={1} borderBottomColor="gray.300" py={3}>
          <Text fontSize="lg">Notifications</Text>
        </Box>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogoutPress}>
        <Box borderBottomWidth={1} borderBottomColor="gray.300" py={3}>
          <Text fontSize="lg" color="red.500">Logout</Text>
        </Box>
      </TouchableOpacity>
    </VStack>
  );
};


