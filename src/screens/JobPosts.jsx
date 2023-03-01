import { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Moment from 'moment';
import { useNavigation } from '@react-navigation/native';

export const JobPosts = ({ navigation }) => {
  const [data, setData] = useState([]);
  const url = "http://localhost:5001/api/v1/jobs";

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  const filteredData = data.filter(post => post.status === 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {filteredData.map((post) => {
       Moment.locale('en');
        return (
          <View key={post._id} style={styles.postContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Text style={styles.postDescription}>{post.title}</Text>
            <Text style={styles.postDescription}>{post.description}</Text>
            <Text style={styles.postDescription}>{Moment(post.posted_date).format('d/MM/YYYY')}</Text>
          </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  postContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  postDescription: {
    fontSize: 18,
  },
});
