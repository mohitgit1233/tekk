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
        
  console.log(data)

  return (
    <Box bg="white" height="100%" >
      <View style={styles.searchContainer}>
   
      </View>

      <ScrollView contentContainerStyle={styles.container}>
  {data ? (
    <>
         
            <View style={styles.postContainer}>
            
            <Text style={styles.postTitle}>{data.title}</Text>
            <Text style={styles.postDate}>Post Date: {Moment(data.posted_date).format('D MMMM YYYY')}</Text>
            
            
              {/* <Image style={styles.postImage} source={data.images ? { uri: data.images[0] }:{uri:"https://dummyimage.com/600x400/666666/c4c4c4&text=No+Image+found"}} /> */}
              <ScrollView horizontal={true} style={styles.imageCarousel}>
        {data.images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </ScrollView>
              <Text style={styles.postDescription}>{data.description}</Text>
              
              <View style={styles.labeltextwrap}>
                <View style={styles.labeltextout}>
              <Text style={styles.label}>Status:</Text>
              <Text style={styles.postText}> {data.status}</Text>
              </View>
              
              <View style={styles.labeltextout}>
              <Text style={styles.label}>Preferred Start Date:</Text>
              <Text style={styles.postText}> {Moment(data.preferred_start_date).format('D MMMM YYYY')}</Text>
              </View>

              <View style={styles.labeltextout}>
              <Text style={styles.label}>Budget:</Text>
              <Text style={styles.postText}> ${(data.max_cost)}</Text>
              </View>

              

           
              

              {status == 'new job' ? <></> :

              <View style={styles.labeltextout}>
              <Text style={styles.label}>Start Date:</Text>
              <Text style={styles.postText}>{data.start_date == null ? <Text>NA</Text> : Moment(data.start_date).format('D MMMM YYYY')}</Text>
              </View>}

</View>
            
              {status == 'upcoming' ? <TouchableOpacity style={styles.botton} ><Text style={styles.btntxt}>Cancel Appointment</Text></TouchableOpacity> : <></>}    
                {status == 'new job' ? <Text style={{fontSize:19,textAlign:'center',fontWeight:'bold',marginTop: 20,}}>No offers yet</Text> : <></>} 
                {status == 'ongoing' ? <TouchableOpacity style={styles.botton} ><Text style={styles.btntxt}>Complete Job</Text></TouchableOpacity> : <></>} 
         
            
            
            </View>   

          

      
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

    borderBottomWidth:1
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',


    borderBottomWidth:1
  },
  postDescription: {
    fontSize: 16,
    marginTop:10
  },postStatus: {
    fontSize: 14,

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
    paddingHorizontal:80,
    paddingVertical: 15,
    
    // borderRadius: 30,
    marginTop: 20,
    // marginBottom: 20,
  },
  btntxt:{
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  labeltextwrap:{
    display:'flex',
    flexDirection:'column',
    marginTop:10,
    
   
  
  },labeltextout:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-start',
    borderWidth:1,
    borderRadius:5,
    marginTop:10,
    padding:20,
    textAlign:'left',
    
  },
  label:{
    width:130,
    fontSize:18,
    color:'#0D937D',
    fontWeight:'bold'
  },postText:{
      fontSize:17,
      textAlign:'left'
  }
 
});

export default PostDetails;
