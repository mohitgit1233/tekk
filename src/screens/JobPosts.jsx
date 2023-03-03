import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import Moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export const JobPosts = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const url = 'http://localhost:5001/api/v1/jobs';

  
  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  const filteredData = data.filter(
    (post) => post.status === 'new job' && post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.searchContainer}>
        <AntDesign name="search1" size={24} color="black" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Jobs"
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
        />
      </View>
      {filteredData.map((post) => {
        Moment.locale('en');
        return (
          <TouchableOpacity key={post._id} onPress={() => navigation.navigate('JobContainer', { id: post._id })}>
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
});
