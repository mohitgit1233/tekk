import React, { useEffect, useState,useContext } from 'react'
import { Box, FlatList, Center, NativeBaseProvider, Text, Button, ScrollView, View } from "native-base";
import Moment from 'moment';
import { StyleSheet, TouchableOpacity,TextInput,Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getJobsByEmployerId } from '../../services/api';
import AppContext from '../../AppContext';

const MyPosts = ({ route }) => {
  const { loggedInUser, setLoggedInUser } = useContext(AppContext);

    const [data, setData] = useState([]);
    const navigation = useNavigation();
    const [status,SetStatus] = useState('')
  const [searchTerm, setSearchTerm] = useState('');
  const [postStatus, setpostStatus] = useState('all')
  // const { refreshData } = route.params;
  
  // console.log('yolooo',refreshData)

  let filteredData = []
 

  useEffect(() => {
    const see = async()=>{
  //  await fetch(url)
  //     .then((resp) => resp.json())
  //     .then((json) => setData(json))
  //     .catch((error) => console.error(error));
      const json = await getJobsByEmployerId(loggedInUser.id)
      setData(json)
    }
    see()
  }, []);
  console.log(data.length)

  const handleFilter = (status) => {
    setpostStatus(status);
  };


  if (data.length > 0){
    if (postStatus == 'all'){
        filteredData = data.filter(post => post.status !== 'offered' );
    } else{
        filteredData = data.filter(post => post && post.status === postStatus && post.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
}
  
  console.log(data)

  const renderItem = ({ item }) => {
    Moment.locale('en');
    return (
      <TouchableOpacity
        style={styles.postContainer}
        key={item._id}
        onPress={() =>
          navigation.navigate('PostDetails', { id: item._id, status: item.status })
        }>
        <Image style={styles.postImage} source={{ uri: item.picture }} />
        <View>
          <Text style={styles.postTitle}>{item.title}</Text>
          <Text style={styles.postDescription}>{item.description}</Text>
          <Text style={styles.postDate}>{Moment(item.posted_date).format('D MMMM YYYY')}</Text>
          <Text style={styles.postStatus}>{item.status}</Text>
        </View>
      </TouchableOpacity>
    );
  };
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
      <View style={styles.filterContainer}>
        <Button
          variant={postStatus === 'all' ? 'solid' : 'outline'}
          onPress={() => handleFilter('all')}
          mr={2}
          mb={2}>
          All posts
        </Button>
        <Button
          variant={postStatus === 'ongoing' ? 'solid' : 'outline'}
          onPress={() => handleFilter('ongoing')}
          mr={2}
          mb={2}>
          Ongoing
        </Button>
        <Button
          variant={postStatus === 'upcoming' ? 'solid' : 'outline'}
          onPress={() => handleFilter('upcoming')}
          mb={2}>
          Upcoming
        </Button>
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={styles.container}
        ListEmptyComponent={<Text>Nothing found</Text>}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreatePost')}>
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </Box>
  );
}

const styles = StyleSheet.create({
  postContainer: {
  flexDirection: 'row',
  padding: 16,
  borderBottomWidth: 1,
  borderBottomColor: '#ccc',
  },
  postImage: {
  width: 80,
  height: 80,
  borderRadius: 8,
  marginRight: 16,
  },
  postTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 8,
  },
  postDescription: {
  fontSize: 16,
  marginBottom: 8,
  },
  postDate: {
  fontSize: 14,
  marginBottom: 8,
  },
  postStatus: {
  fontSize: 14,
  fontWeight: 'bold',
  },
  searchContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#f2f2f2',
  paddingHorizontal: 16,
  paddingVertical: 8,
  },
  searchIcon: {
  marginRight: 8,
  },
  searchInput: {
  flex: 1,
  fontSize: 16,
  },
  filterContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginVertical: 8,
  },
  addButton: {
  position: 'absolute',
  bottom: 32,
  right: 32,
  backgroundColor: '#2a9d8f',
  borderRadius: 50,
  width: 64,
  height: 64,
  alignItems: 'center',
  justifyContent: 'center',
  },
  container: {
  flexGrow: 1,
  paddingBottom: 64,
  },
  });


export default MyPosts;
