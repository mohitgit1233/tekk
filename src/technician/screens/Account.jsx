import { AspectRatio, Box, Button, HStack, Image, Text, View, VStack } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
// import { Reload } from 'react-native/Libraries/Reload/Reload';
import { CommonActions } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';




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

<VStack flex={1} p={2} style={{backgroundColor:"white"}}>
  <TouchableOpacity onPress={handleProfilePress}>
    <Box borderBottomWidth={1} borderBottomColor="gray.300" py={3}>
      <HStack alignItems="center">
        <MaterialIcons name="person" size={24} color="black" style={{ marginRight: 10 }} />
        <Text fontSize="lg">Profile</Text>
      </HStack>
    </Box>
  </TouchableOpacity>
  {/* <TouchableOpacity onPress={handleJobHistoryPress}>
    <Box borderBottomWidth={1} borderBottomColor="gray.300" py={3}>
      <HStack alignItems="center">
        <MaterialIcons name="work" size={24} color="black" style={{ marginRight: 10 }} />
        <Text fontSize="lg">Job History</Text>
      </HStack>
    </Box>
  </TouchableOpacity> */}
  <TouchableOpacity onPress={handleNotificationsPress}>
    <Box borderBottomWidth={1} borderBottomColor="gray.300" py={3}>
      <HStack alignItems="center">
        <MaterialIcons name="notifications" size={24} color="black" style={{ marginRight: 10 }} />
        <Text fontSize="lg">Notifications</Text>
      </HStack>
    </Box>
  </TouchableOpacity>
  <TouchableOpacity onPress={handleLogoutPress}>
    <Box borderBottomWidth={1} borderBottomColor="gray.300" py={3}>
      <HStack alignItems="center">
        <MaterialIcons name="logout" size={24} color="red" style={{ marginRight: 10 }} />
        <Text fontSize="lg" color="red.500">Logout</Text>
      </HStack>
    </Box>
  </TouchableOpacity>
</VStack>


  );
};


