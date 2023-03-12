import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import Moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { getNotificationsByTechId } from '../../services/api';

const NotificationBell = ({ hasNotifications }) => {
  const [notificationCount, setNotificationCount] = useState(0);

  const tech_id = '63f17ce257353e03afc8f124' // to be replaced

  // const new_url = `http://localhost:5001/api/v1/technicians/${tech_id}/notifications`

  const navigation = useNavigation();
  const navigateToNotification = () => {
    navigation.navigate('Notifications');
  };
  useEffect(() => {
    // fetch(new_url)
    //   .then((resp) => resp.json())
    //   .then((json) => setNotificationCount(json))
    //   .catch((error) => console.error(error));
    const see = async ()=> {
      const json = await getNotificationsByTechId(tech_id)
      setNotificationCount(json)
    }
    see()
  }, []);
  return (
    <TouchableOpacity onPress={navigateToNotification}>
      <View style={styles.headerRight}>
        <MaterialCommunityIcons name="bell-outline" size={24} color="black" />
        {notificationCount > 0 && (
          <View style={styles.notificationCount}>
            <Text style={styles.notificationCountText}>{notificationCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  notificationCount: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    position: 'absolute',
    top: -8,
    right: -8,
  },
  notificationCountText: {
    color: 'white',
    fontSize: 10,
  },
})

export default NotificationBell;
