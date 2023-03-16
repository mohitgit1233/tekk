import React, { useEffect, useState } from 'react'
import { Box, FlatList, Center, NativeBaseProvider, Text, Button, ScrollView, View } from "native-base";
import Moment from 'moment';
import { StyleSheet, TouchableOpacity,TextInput,Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getJobById } from '../../services/api';

const PostDetails = () => {
    const [data, setData] = useState(null);
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
            <Text style={styles.postStatus}>Job Status: {data.status}</Text>
            <Text style={styles.postDate}>{Moment(data.posted_date).format('D MMMM YYYY')}</Text>
            <Text style={styles.postTitle}>{data.title}</Text>

              {/* <Image style={styles.postImage} source={data.images ? { uri: data.images[0] }:{uri:"https://dummyimage.com/600x400/666666/c4c4c4&text=No+Image+found"}} /> */}
              <ScrollView horizontal={true} style={styles.imageCarousel}>
        {data.images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </ScrollView>
              <Text style={styles.postDescription}>{data.description}</Text>
              
              
            </View>   

          
                {status == 'upcoming' ? <TouchableOpacity style={styles.botton} ><Text style={styles.btntxt}>Cancel Appointment</Text></TouchableOpacity> : <></>}    
                {status == 'new job' ? <Text style={{fontSize:19,fontWeight:'bold'}}>No offers yet</Text> : <></>} 
                {status == 'ongoing' ? <TouchableOpacity style={styles.botton} ><Text style={styles.btntxt}>Complete Job</Text></TouchableOpacity> : <></>} 
         
      
    </>
  ) : (
    <>
      <Text>nothing found</Text>
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
   

  },
  postDate:{
    marginBottom:20,
    borderBottomWidth:1
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',

    marginBottom: 20,
    borderBottomWidth:1
  },
  postDescription: {
    fontSize: 16,
    
  },postStatus: {
    fontSize: 17,
    marginTop:12
  },
  postImage: {
    width: 300,
    
    marginRight: 10,
    height: 100,
  },
  imageCarousel: {
    borderRadius: 10,
    marginTop: 10,
   marginBottom:0
  },
  image: {
    width: 350,
    height:190,
    padding:0,
    marginRight: 10,
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
  botton:{
    backgroundColor: '#0D937D',
    paddingVertical: 15,
    paddingHorizontal: 80,
    // borderRadius: 30,
    // marginTop: 20,
    // marginBottom: 20,
  },
  btntxt:{
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PostDetails;
