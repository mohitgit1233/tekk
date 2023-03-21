import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { ScrollView } from 'native-base';
import { ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
// import { useState, useEffect } from 'react';
import { getNotificationsByTechId } from '../../services/api';
import React, { useState, useEffect,useContext } from 'react';
import AppContext from '../../AppContext';
import { UserAuth } from '../context/AuthContext';

import Moment from 'moment';
const NotificationPage = () => {
  const { user } = UserAuth();
  const [data, setData] = useState([]);

  // const tech_id = '63f17ce257353e03afc8f124'// to be replaced 
 
  // const new_url = `http://localhost:5001/api/v1/technicians/${tech_id}/notifications`


  useEffect(() => {
    // fetch(new_url)
    //   .then((resp) => resp.json())
    //   .then((json) => setData(json))
    //   .catch((error) => console.error(error));
     const see = async () => {
      const json  = await getNotificationsByTechId(user._id)
      const json2 =   json.sort((a, b) => new Date(b.date) - new Date(a.date));
      setData(json2)
     }
     see()
  }, []);

  async function onDismiss(id) {
    // const json = await deleteNotificationById(id)
    // setData(json)
  }


  return (
    <ScrollView contentContainerStyle={styles.container} >
    <View>
      {/* <Text>NotificationPage</Text> */}
    </View>
    {data.map((post,index) => {
        return (
          <TouchableOpacity key={post._id} >
            <View  key={index} style={styles.card} >

              <Text style={styles.postHeading}>{post.heading}</Text>
              <Text style={styles.postDate}>{Moment(post.posted_date).format('D/MM/YYYY | h:mm a')}</Text>
              <Text style={styles.postText}>{post.text}</Text>
              <TouchableOpacity style={styles.dismissButton} onPress={() => onDismiss(post._id)}>
            <Text style={styles.dismissButtonText}>X</Text>
          </TouchableOpacity>

            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  )
}

export default NotificationPage


const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  postHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postDate: {
    fontSize: 16,
    color: '#888',
    marginBottom: 16,
  },
  postText: {
    fontSize: 18,
    lineHeight: 24,
  },
  dismissButton: {
    backgroundColor: '#ccc',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 16,
    right: 16,
  },
  dismissButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
