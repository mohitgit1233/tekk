import { AspectRatio, Box, Button, HStack, Image, Text, VStack } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
// import { Reload } from 'react-native/Libraries/Reload/Reload';
import { CommonActions } from '@react-navigation/native';




export const Account = ({ navigation }) => {

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
    // Handle logout logic here
    // navigation.navigate('Logout');
    // Reload.reload();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );

    
    // navigation.navigate('Logout', { refreshTimeStamp: new 
    //   Date().toISOString() })
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


