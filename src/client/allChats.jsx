
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, KeyboardAvoidingView,TouchableOpacity, ScrollView, Image } from 'react-native';
import { Box, Center, NativeBaseProvider } from "native-base";
import { AntDesign } from '@expo/vector-icons';
import { SubChatClient }  from './SubChatClient'
import { useNavigation } from '@react-navigation/native';
import { getJobs, getRooms } from '../../services/api';
import AppContext from '../../AppContext';


export const AllChats = ({navigation}) => {
  const { loggedInUser, setLoggedInUser } = useContext(AppContext);

  const [data1, setData1] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const json = await getRooms();
        const filteredArray = json
          .filter((item) => item.employer_id._id === loggedInUser.id)
          .sort((a, b) => new Date(b.room_created) - new Date(a.room_created));
        setData1(filteredArray);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const navigateToNotification = (kindof_prop1, p2, roomid, job_id ) => {
    console.log(kindof_prop1);
    navigation.navigate('Chat', { propValue: kindof_prop1, p2 , roomid,  job_id });
  };

  const filteredData = data1.filter((item) => {
    return (
      item.technician_id.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.job_id.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  return (
    <Box bg="white" height="100%">
      <View style={styles.searchContainer}>
        <AntDesign name="search1" size={24} color="black" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Chat"
          onChangeText={handleSearch}
          value={searchTerm}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.head}>Select Technician To Chat</Text>
        {/* AI button */}
        {/* <TouchableOpacity
          style={styles.postContainer}
        >
          <Image
            source={{ uri: "https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY" }}
            style={styles.image}
          />
          <Text style={styles.postDescription}>
            Ask AI
          </Text>
        </TouchableOpacity> */}
        <FlatList
          style={styles.list}
          data={filteredData}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.postContainer}
              onPress={() =>
                navigateToNotification(item._id, item.technician_id._id, item._id, item.job_id._id)
              }
            >
              <Image
                source={{ uri: item.job_id.images[0] }}
                style={styles.image}
              />
              <View>
                <Text style={styles.postDescription}>{item.job_id.title}</Text>
                <Text style={styles.employerName}>Technician: {item.technician_id.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </Box>
  );
};


const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  head: {
    fontSize: 30,
    marginVertical: 10,
  },
  list: {
    flex: 1,
  },
  postContainer: {
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  postDescription: {
    fontSize: 18,
  },
  employerName: {
    fontSize: 14,
    marginTop: 5,
  },
});

