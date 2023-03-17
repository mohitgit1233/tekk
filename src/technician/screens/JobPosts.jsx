import React, { useEffect, useState,useContext } from 'react';
import { StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import Moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { AntDesign,MaterialCommunityIcons } from '@expo/vector-icons';
import NotificationBell from '../../reusable screens/NotificationBell';
import { Box, FlatList, Center, NativeBaseProvider, Text, Button, ScrollView, View } from "native-base";
import { getJobs } from '../../../services/api';
import { UserAuth } from '../../context/AuthContext';

export const JobPosts = () => {
  const { user } = UserAuth();
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
    const unsubscribe = navigation.addListener('focus', () => {
      const see =  async () => {
        const json = await getJobs()
        setData(json)
      }
      see()
    });
    console.log('here')
    const see =  async () => {
      const json = await getJobs()
      setData(json)
    }
    see()
    return unsubscribe;
  }, [navigation]);
  //changed here
  const filteredData = !data && data.filter(
    (post) =>
      (post.status === 'new job') &&
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => new Date(b.posted_date) - new Date(a.posted_date));

  const navigation = useNavigation();

  return (
    <>
      <Box bg="#F9F8F5" height="100%">
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <AntDesign name="search1" size={24} color="black" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Jobs"
              onChangeText={(text) => setSearchTerm(text)}
              value={searchTerm}
            />
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          {filteredData.length > 0 && filteredData.map((post) => {
            Moment.locale('en');
            return (
              <TouchableOpacity key={post._id} onPress={() => navigation.navigate('JobContainer', { id: post._id, tech_id: user._id })}>
                <View style={styles.postContainer}>
                  <View style={styles.postTitleContainer}>
                    <Image style={styles.postImage} source={{ uri: post.images[0] }} />
                    <View style={styles.postContent}>
                      <View style={styles.postHeader}>
                        <Text style={styles.postTitleText}>{post.title}</Text>
                        {/* <Text style={styles.postSubtitleText}>{post.location}</Text> */}
                        <Text style={{ marginRight: 5 }}>
    <Text style={{ fontWeight: 'bold' }}>Posted Date:</Text>{' '}
    {Moment(post.posted_date).format('M/DD/YYYY')}
  </Text>



                      </View>
                      <Text style={styles.postDescription}>{post.description.length > 20 ? post.description.split(' ').slice(0, 8).join(' ') + '......'  : post.description.split(' ').slice(0, 8).join(' ')}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Box>
    </>
  );
  
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F8F5',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  postDate: {
    fontSize: 8,
  },
  searchContainer: {
    flexDirection: 'row',
  alignItems: 'center',
  backgroundColor:'white',
  paddingHorizontal: 16,
  paddingVertical: 8,
  margin:10,
  borderWidth:0.5,
  borderColor:'#074A3F'
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  postContainer: {
    backgroundColor: 'white',
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postSubtitleText: {
    fontSize: 16,
    color: '#888888',
  },
  postDescription: {
    fontSize: 16,
  marginBottom: 5,
  maxWidth:190,
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
