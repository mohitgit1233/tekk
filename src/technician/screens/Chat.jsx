
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, KeyboardAvoidingView,TouchableOpacity, ScrollView } from 'react-native';
import { SubChat }  from './SubChat'
import { useNavigation } from '@react-navigation/native';
const connection_api = 'http://192.168.5.131:3000/connection';
const message_api = 'http://192.168.5.131:3000/message';

export const Chat = ({navigation}) => {
  const [data1, setData1] = useState([]);

  useEffect(() => {
    const getJobs = async()=>{
      await fetch("http://localhost:5001/api/v1/jobs")
         .then((resp) => resp.json())
         .then((json) => {
          console.log(json);
          setData1(json)
        })
         .catch((error) => console.error(error));
       }
       getJobs()
  }, []);

  const navigateToNotification = (kindof_prop1, p2) => {
    console.log(kindof_prop1);
    navigation.navigate('SubChat', { propValue: kindof_prop1, p2 });
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

              <Text style={styles.postDescription}  onPress={() => navigateToNotification(post._id, post.employer)}  >Job: {post._id} - Employer: {post.employer}</Text>


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