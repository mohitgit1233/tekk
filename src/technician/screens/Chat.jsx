
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
<ScrollView> 

    <View style={styles.container}>
      <Text style={styles.head}>Select Employer To Chat</Text>

      {data1.map((post) => {
        return (
          <TouchableOpacity key={post._id} >
            <View>

              <Text style={styles.postDescription}  onPress={() => navigateToNotification(post._id, post.employer_id, post._id)}  >Job: {post._id} - Employer: {post.employer_id}</Text>


            </View>
          </TouchableOpacity>
        );
      })}


      {/* <Button title="adil" onPress={() => navigateToNotification("adilsaju_emp")}  >Adil</Button> */}
    </View>
</ScrollView> 

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    color: 'white'
  },
  head: {
    fontSize: 30
  }

});