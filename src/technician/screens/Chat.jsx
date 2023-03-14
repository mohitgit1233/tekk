
import React, { useState, useEffect,useContext } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, KeyboardAvoidingView,TouchableOpacity, ScrollView } from 'react-native';
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
      console.log(json);
      console.log(loggedInUser.id);
      const filteredArray = json.filter((item) => item.technician_id === loggedInUser.id);

      setData1(filteredArray)

       }
       getJobs()
  }, []);

  const navigateToNotification = (kindof_prop1, p2, roomid ) => {
    console.log(kindof_prop1);
    navigation.navigate('SubChat', { propValue: kindof_prop1, p2 , roomid  });
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.message}>
        <Text style={styles.sender} >{item.sender}</Text>
        <Text>{item.message}</Text>
      </View>
    );
  };

  return (

    <View style={styles.container}>
      <Text style={styles.head}>Select Employer To Chat</Text>
      <View style={styles.postContainer}>
        <TouchableOpacity >
          <Text style={styles.postDescription}> Ask AI</Text>
        </TouchableOpacity>
      </View>
      <FlatList
  style={styles.list}
  data={data1}
  keyExtractor={(item) => item._id}
  renderItem={({ item }) => (
    <View style={styles.postContainer}>
      <TouchableOpacity onPress={() => navigateToNotification(item._id, item.employer_id, item._id)}>
        <Text style={styles.postDescription}>Job: {item.job_id} - Employer: {item.employer_id}</Text>
      </TouchableOpacity>
    </View>
  )}
/>


      {/* <Button title="adil" onPress={() => navigateToNotification("adilsaju_emp")}  >Adil</Button> */}
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
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
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
  },
  postDescription: {
    fontSize: 18,
  },
});