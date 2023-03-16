
import React, { useState, useEffect,useContext } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, KeyboardAvoidingView,TouchableOpacity, ScrollView,Image } from 'react-native';
import { SubChat }  from './SubChat'
import { useNavigation } from '@react-navigation/native';
import { getRooms } from '../../../services/api';
import AppContext from '../../../AppContext';
// const connection_api = 'http://192.168.5.131:3000/connection';
// const message_api = 'http://192.168.5.131:3000/message';

export const Chat = ({navigation}) => {
  const { loggedInUser, setLoggedInUser } = useContext(AppContext);

  const [data1, setData1] = useState([]);

  useEffect(() => {
    const getJobs = async()=>{
      // await fetch("http://localhost:5001/api/v1/jobs")
      // await fetch("http://localhost:5001/api/v1/rooms")
      //    .then((resp) => resp.json())
      //    .then((json) => {
      //     console.log(json);
      //     setData1(json)
      //   })
      //    .catch((error) => console.error(error));

      const json = await getRooms()
      console.log("DATA NEEDED");
      console.log(json);
      console.log(loggedInUser.id);
      const filteredArray = json.filter((item) => item.technician_id._id === loggedInUser.id);

      setData1(filteredArray)

       }
       getJobs()
  }, []);

  const navigateToNotification = (kindof_prop1, p2, roomid ) => {
    console.log(kindof_prop1);
    navigation.navigate('SubChat', { propValue: kindof_prop1, p2 , roomid  });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Select Employer To Chat</Text>
      <FlatList
        style={styles.list}
        data={data1}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.postContainer}
            onPress={() =>
              navigateToNotification(item._id, item.employer_id._id, item._id)
            }
          >
            <Image
              source={{ uri: item.job_id.images[0] }}
              style={styles.image}
            />
            <Text style={styles.postDescription}>
              Job: {item.job_id.title} - Employer: {item.employer_id.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  head: {
    fontSize: 30,
    marginVertical: 10,
  },
  list: {
    flex: 1,
  },
  postContainer: {
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  postDescription: {
    fontSize: 18,
  },
});