
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, KeyboardAvoidingView,TouchableOpacity, ScrollView } from 'react-native';
import { SubChatClient }  from './SubChatClient'
import { useNavigation } from '@react-navigation/native';
import { getJobs } from '../../services/api';


export const AllChats = ({navigation}) => {
  const [data1, setData1] = useState([]);

  useEffect(() => {
    const fetchData = async()=>{
      // await fetch("http://localhost:5001/api/v1/jobs")
      const json =  await getJobs()
      setData1(json)
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
<ScrollView> 

    <View style={styles.container}>
      <Text style={styles.head}>Select Technician To Chat</Text>

      {data1.map((post) => {
        return (
          <TouchableOpacity key={post._id} >
            <View>

              <Text style={styles.postDescription}  onPress={() => navigateToNotification(post._id, post.technician_id, post._id)}  >Job: {post._id} - Employer: {post.employer_id}</Text>


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