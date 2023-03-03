import React, { useEffect, useState } from 'react'
import { Box, FlatList, Center, NativeBaseProvider, Text, Button, ScrollView, View } from "native-base";
import Moment from 'moment';
import { StyleSheet, TouchableOpacity,TextInput,Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';

const Offers = () => {
    const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // const [postStatus, setpostStatus] = useState('all')
  
 
  const url = 'http://localhost:5001/api/v1/employer/63f1b9adcf55c1d5b65f58ad/jobs';

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
      
  }, []);

     const filteredData = data.filter(post => post.status === 'offered' && post.title.toLowerCase().includes(searchTerm.toLowerCase()));


  
  console.log(data)

  return (
    <Box bg="white" height="100%">
      <View style={styles.searchContainer}>
        <AntDesign name="search1" size={24} color="black" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Jobs"
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
        />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {
        filteredData.length > 0 ? <>
        {filteredData.map((post) => {
          Moment.locale('en');
          return (
            <TouchableOpacity key={post._id} onPress={() => navigation.navigate('AllOffers', {id: post._id})}>
              <View style={styles.postContainer}>
              <Image style={styles.postImage} source={{ uri: post.picture }} />
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postDescription}>{post.description}</Text>
                <Text style={styles.postDate}>{Moment(post.posted_date).format('D MMMM YYYY')}</Text>
                <Text style={styles.postDescription}>{post.status}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
        </> :<>
        <Text>nothing found</Text>
        </>
        }
      </ScrollView>
    </Box>
  )
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },filterContainer: {
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
  })

export default Offers