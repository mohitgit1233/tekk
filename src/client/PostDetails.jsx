import React, { useEffect, useState } from 'react'
import { Box, FlatList, Center, NativeBaseProvider, Text, Button, ScrollView, View } from "native-base";
import Moment from 'moment';
import { StyleSheet, TouchableOpacity,TextInput,Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getJobById } from '../../services/api';

const PostDetails = () => {
    const [data, setData] = useState([]);
    const navigation = useNavigation();
    
  const [searchTerm, setSearchTerm] = useState('');
  const [postStatus, setpostStatus] = useState('all')
  const { params } = useRoute();
  const { id,status } = params;
  let filteredData = []
    
  
  // const url = `http://localhost:5001/api/v1/jobs/${id}`;

  useEffect(() => {
    const see = async()=>{
      //   await fetch(url)
      // .then((resp) => resp.json())
      // .then((json) => setData(json))
      // .catch((error) => console.error(error));
      const json = await getJobById(id)
      setData(json)
    }
    see()
  }, []);

        filteredData = data
        
  

  return (
    <Box bg="white" height="100%">
      <View style={styles.searchContainer}>
   
      </View>

      <ScrollView contentContainerStyle={styles.container}>
  {data ? (
    <>
         
            <View style={styles.postContainer}>
              <Image style={styles.postImage} source={{ uri: data.picture }} />
              <Text style={styles.postTitle}>{data.title}</Text>
              <Text style={styles.postDescription}>{data.description}</Text>
              <Text style={styles.postDate}>{Moment(data.posted_date).format('D MMMM YYYY')}</Text>
              <Text style={styles.postDescription}>{data.status}</Text>
            </View>   

          
                {status == 'upcoming' ? <Button>Cancel Appointment</Button> : <></>}    
                {status == 'new job' ? <Text>No offers yet</Text> : <></>} 
                {status == 'ongoing' ? <Button>Complete Job</Button> : <></>} 
         
      
    </>
  ) : (
    <>
      <Text>nothing {filteredData.length} found</Text>
    </>
  )}
</ScrollView>

    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  filterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    display:'flex',
    flexDirection:'row',
    gap:20,
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  postContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%', // Set width to stretch to maximum width

  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  postImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  addButton: {
    backgroundColor: 'blue',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 30, // Change the value to move the button further to the right
  },
});

export default PostDetails;
