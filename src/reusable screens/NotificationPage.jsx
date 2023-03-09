import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import { ScrollView } from 'native-base';
import { ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { useState, useEffect } from 'react';

const NotificationPage = () => {

  const [data, setData] = useState([]);

  const tech_id = '63f17ce257353e03afc8f124'// to be replaced 
 
  const new_url = `http://localhost:5001/api/v1/technicians/${tech_id}/notifications`


  useEffect(() => {
    fetch(new_url)
      .then((resp) => resp.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
     

  }, []);


  return (
    <ScrollView contentContainerStyle={styles.container} >
    <View>
      <Text>NotificationPage</Text>
    </View>
    {data.map((post) => {
        return (
          <TouchableOpacity key={post._id} >
            <View>

              <Text style={styles.postDescription}>{post.heading}</Text>
              <Text style={styles.postDescription}>{post.text}</Text>


            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  )
}

export default NotificationPage

const styles = StyleSheet.create({  container: {
  backgroundColor: '#F5FCFF',
  padding: 10,
},})