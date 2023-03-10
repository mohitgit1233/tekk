import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import Moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { AntDesign,MaterialCommunityIcons } from '@expo/vector-icons';

export const JobPosts = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tech,setTech] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  const url = 'http://localhost:5001/api/v1/jobs';

  const tech_id = '63f17ce257353e03afc8f124'; // to be replaced 

  const navigateToNotification = () => {
    navigation.navigate('Notifications');
  };

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  const filteredData = data.filter(
    (post) =>
      (post.status === 'new job' || post.status === 'offered') &&
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
      <View style={styles.headerRight}>
      <TouchableOpacity onPress={navigateToNotification}>
    <MaterialCommunityIcons name="bell-outline" size={24} color="black" />
    {notificationCount > 0 && (
      <View style={styles.notificationCount}>
        <Text style={styles.notificationCountText}>{notificationCount}</Text>
      </View>
    )}
  </TouchableOpacity>
</View>
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
      {filteredData.map((post) => {
        Moment.locale('en');
        return (
          <TouchableOpacity key={post._id} onPress={() => navigation.navigate('JobContainer', { id: post._id,tech_id:tech_id })}>
            <View style={styles.postContainer}>
              <View style={styles.postTitleContainer}>
                <Image style={styles.postImage} source={{ uri: post.picture }} />
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
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
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
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  postTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  postImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  postTitle: {
    flex: 1,
  },
  postTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postSubtitleText: {
    fontSize: 16,
  },
  postDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  postDate: {
    fontSize: 14,
    color: '#888888',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  notificationCount: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    position: 'absolute',
    top: -8,
    right: -8,
  },
  notificationCountText: {
    color: 'white',
    fontSize: 10,
  },
});
