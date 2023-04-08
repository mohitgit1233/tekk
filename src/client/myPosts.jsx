import React, { useEffect, useState,useContext } from 'react'
import { Box, FlatList, Center, NativeBaseProvider, Text, Button, ScrollView, View } from "native-base";
import Moment from 'moment';
import { StyleSheet, TouchableOpacity,TextInput,Image,RefreshControl,
  SafeAreaView } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getJobsByEmployerId } from '../../services/api';
import { UserAuth } from '../context/AuthContext';
import AppContext from '../../AppContext';

const MyPosts = ({ route }) => {
  const { user } = UserAuth();
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [status,SetStatus] = useState('')
  const [searchTerm, setSearchTerm] = useState('');
  const [postStatus, setpostStatus] = useState('all')
  const [refreshing, setRefreshing] = React.useState(false);
  // const { refreshData } = route.params;
  
  // console.log('yolooo',refreshData)

  let filteredData = []
 

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const see = async()=>{
        //  await fetch(url)
        //     .then((resp) => resp.json())
        //     .then((json) => setData(json))
        //     .catch((error) => console.error(error));
            const json = await getJobsByEmployerId(user._id)
            setData(json)
          }
          see()
    });
    const see = async()=>{
  //  await fetch(url)
  //     .then((resp) => resp.json())
  //     .then((json) => setData(json))
  //     .catch((error) => console.error(error));
      const json = await getJobsByEmployerId(user._id)
      setData(json)
    }
    see()
    return unsubscribe;
  }, [navigation]);
  console.log(data.length)

  const handleFilter = (status) => {
    setpostStatus(status);
  };

  const seeRefresh = async()=>{
    await fetch(url)
       .then((resp) => resp.json())
       .then((json) => setData(json))
       .catch((error) => console.error(error));
     }

  console.log(data.length)
  if (data.length > 0){
    if (postStatus === 'all'){
      filteredData = data.filter(post => post.status !== 'offered' && post.title.toLowerCase().includes(searchTerm.toLowerCase())).sort((a, b) => new Date(b.posted_date) - new Date(a.posted_date));
    } else {
      filteredData = data.filter(post => post && post.status === postStatus && post.title.toLowerCase().includes(searchTerm.toLowerCase())).sort((a, b) => new Date(b.posted_date) - new Date(a.posted_date));
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
          
        <Image style={styles.postImage} source={{ uri: item.images[0] }} />
        <View>
          <Text style={styles.postTitle}>{item.title}</Text>
          <Text style={styles.postDate}>{Moment(item.posted_date).format('D MMMM YYYY')}</Text>
          {/* <Text style={styles.postStatus}>{item.status}</Text> */}
          <Text style={styles.postDescription}>{item.description.length > 20 ? item.description.split(' ').slice(0, 10).join(' ') + '......'  : item.description.split(' ').slice(0, 11).join(' ')}</Text>
          
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <Box bg="#F9F8F5" height="100%">
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
          mb={2} 
          width={110}
          borderWidth={0.5}
          borderColor={'#074A3F'}
          style={postStatus === 'all' ?{ backgroundColor: '#0D937D' }:{ backgroundColor: '#F9F8F5' }}
          >
            <Text style={postStatus === 'all' ?{ color: '#F9F8F5', }: { color: '#0D937D', }}>
            All posts
            </Text>
          
        </Button>
        <Button
          variant={postStatus === 'ongoing' ? 'solid' : 'outline'}
          onPress={() => handleFilter('ongoing')}
          mr={2}
          mb={2}
          width={110}
          borderWidth={0.5}
          borderColor={'#074A3F'}
          style={postStatus === 'ongoing' ?{ backgroundColor: '#0D937D'}:{ backgroundColor: '#F9F8F5' }}>
          <Text style={postStatus === 'ongoing' ?{ color: '#F9F8F5', }: { color: '#0D937D', }}>
            Ongoing
            </Text>
        </Button>
        <Button
          variant={postStatus === 'upcoming' ? 'solid' : 'outline'}
          onPress={() => handleFilter('upcoming')}
          mb={2}
          width={110}
          borderWidth={0.5}
          borderColor={'#074A3F'}
          style={postStatus === 'upcoming' ?{ backgroundColor: '#0D937D', }:{ backgroundColor: '#F9F8F5', }}>
          <Text style={postStatus === 'upcoming' ?{ color: '#F9F8F5', }: { color: '#0D937D', }}>
            Upcoming
            </Text>
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
        onPress={() => navigation.navigate('Create Post')}>
        <AntDesign name="plus" size={24} color="#F9F8F5" />
      </TouchableOpacity>
    </Box>
    
  );
  
}

const styles = StyleSheet.create({
  
  postContainer: {
  flexDirection: 'row',
  paddingBottom:15,
  paddingTop:15,
  paddingLeft:5,
  paddingRight:5,
  borderBottomWidth: 1,
  borderBottomColor: '#ccc',
  backgroundColor:'#F9F8F5',
  marginLeft:15,
  marginRight:15
  },
  postImage: {
    width: 150,
    height: 100,
    marginRight: 10,
    borderRadius: 10
  },
  postTitle: {
  fontSize: 20,
  fontWeight: 'bold',

  },
  postDescription: {
  fontSize: 16,
  marginBottom: 5,
  maxWidth:190,
  marginTop:5
  },
  postDate: {
  fontSize: 14,
    marginBottom:5
  },
  postStatus: {
   
      color:'#0D937D',
      fontSize:14,
      borderWidth:1,
      borderRadius:5,
      maxWidth:100,
     
      textAlign:'center',
      borderColor:'#0D937D',
    
  
  textTransform:'uppercase'
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
  marginRight: 8,
  },
  searchInput: {
  flex: 1,
  fontSize: 16,
  
  },
  filterContainer: {
    display:'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginVertical: 8,
  
 
  },
  addButton: {
  position: 'absolute',
  bottom: 32,
  right: 32,
  backgroundColor: '#0D937D',
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
