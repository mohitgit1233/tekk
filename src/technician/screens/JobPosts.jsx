import React, { useEffect, useState,useContext } from 'react';
import { StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import Moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { AntDesign,MaterialCommunityIcons } from '@expo/vector-icons';
import NotificationBell from '../../reusable screens/NotificationBell';
import { Box, FlatList, Center, NativeBaseProvider, Text, Button, ScrollView, View } from "native-base";
import { getJobs } from '../../../services/api';
import AppContext from '../../../AppContext';
export const JobPosts = () => {
  const { loggedInUser, setLoggedInUser } = useContext(AppContext);

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tech,setTech] = useState([]);

  // const url = 'http://localhost:5001/api/v1/jobs';

  // const tech_id = '63f17ce257353e03afc8f124'; // to be replaced 

  useEffect(() => {
    // fetch(url)
    //   .then((resp) => resp.json())
    //   .then((json) => setData(json))
    //   .catch((error) => console.error(error));
    const see =  async () => {
      const json = await getJobs()
      setData(json)
    }
    see()
  }, []);

  const filteredData = data.filter(
    (post) =>
      (post.status === 'new job' || post.status === 'offered') &&
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigation = useNavigation();

  return (
    
      <>
      <Box bg="white" height="100%">
        {/* <Text>{loggedInUser.name}</Text> */}
      <View style={styles.header}>
      <View style={styles.searchContainer}>
        <AntDesign name="search1" size={24} color="black" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Jobs"
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm} />
      </View>
    </View><ScrollView contentContainerStyle={styles.container}>
        {filteredData.map((post) => {
          Moment.locale('en');
          return (
            <TouchableOpacity key={post._id} onPress={() => navigation.navigate('JobContainer', { id: post._id, tech_id: loggedInUser.id })}>
              <View style={styles.postContainer}>
                <View style={styles.postTitleContainer}>
                  <Image style={styles.postImage} source={{ uri: post.images[0] }} />
                  <View style={styles.postTitle}>
                    <Text style={styles.postTitleText}>{post.title}</Text>
                    <Text style={styles.postSubtitleText}>{post.location}</Text>
                  </View>
                </View>
                <Text style={styles.postDescription}>{post.description}</Text>
                <Text style={styles.postDate}>{Moment(post.posted_date).format('MMMM Do, YYYY')}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      </Box></>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    height: 40,
    flex: 1,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  postContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  postTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  postImage: {
    width: 150,
    height: 100,
    marginRight: 10,
    borderRadius: 10
  },
  postTitle: {
    flex: 1,
  },
  postTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postSubtitleText: {
    fontSize: 16,
    color: '#888888',
  },
  postDescription: {
    fontSize: 16,
    marginBottom: 10,
    flex: 1
  },
  postDate: {
    fontSize: 14,
    color: '#888888',
    alignSelf: 'flex-end'
  },
  notificationCount: {
    backgroundColor: '#FF0000',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  notificationText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  notificationBell: {
    marginLeft: 10,
  },
});
