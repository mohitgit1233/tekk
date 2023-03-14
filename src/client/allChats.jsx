
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, KeyboardAvoidingView,TouchableOpacity, ScrollView } from 'react-native';
import { SubChatClient }  from './SubChatClient'
import { useNavigation } from '@react-navigation/native';
import { getJobs, getRooms } from '../../services/api';
import AppContext from '../../AppContext';


export const AllChats = ({navigation}) => {
  const { loggedInUser, setLoggedInUser } = useContext(AppContext);

  const [data1, setData1] = useState([]);

  useEffect(() => {
    const fetchData = async()=>{
      // await fetch("http://localhost:5001/api/v1/jobs")
      // const json =  await getJobs()
      const json =  await getRooms()
      console.log(loggedInUser.id);
      const filteredArray = json.filter((item) => item.employer_id === loggedInUser.id);

      setData1(filteredArray)
      // setData1(json)
    }
    fetchData()
  }, []);

  const navigateToNotification = (kindof_prop1, p2, roomid ) => {
    console.log(kindof_prop1);
    navigation.navigate('SubChatClient', { propValue: kindof_prop1, p2 , roomid  });
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
  <Text style={styles.head}>Select Technician To Chat</Text>

  <FlatList
style={styles.list}
data={data1}
keyExtractor={(item) => item._id}
renderItem={({ item }) => (
<View style={styles.postContainer}>
  <TouchableOpacity onPress={() => navigateToNotification(item._id, item.technician_id, item._id)}>
    <Text style={styles.postDescription}>Job: {item._id} - Technician: {item.technician_id}</Text>
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