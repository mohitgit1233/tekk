import React, { useEffect, useState } from 'react'
import { Box, FlatList, Center, NativeBaseProvider, Text, Button, ScrollView, View } from "native-base";
import Moment from 'moment';
import { StyleSheet, TouchableOpacity,TextInput,Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import ClockInOut from './ClockInOut';
import { getEmploymentByOfferId } from '../../../services/api';

const JobFull = () => {
    const [data, setData] = useState([]);
    const navigation = useNavigation();
    
  const [searchTerm, setSearchTerm] = useState('');
  const [postStatus, setpostStatus] = useState('all')
  const { params } = useRoute();
  const { id,status } = params;
  let filteredData = []
    
  
  const url = `http://localhost:5001/api/v1/offer/${id}/employment`;
    
  useEffect(() => {
    const see = async()=>{
      //   await fetch(url)
      // .then((resp) => resp.json())
      // .then((json) => setData(json))
      // .catch((error) => console.error(error));
      const json = await getEmploymentByOfferId(id);
      setData(json)
    }
    see()
  }, []);


        
//   console.log("data",data[0].employment_status)

  return (
    <Box bg="white" height="100%">


      <ScrollView contentContainerStyle={styles.container}>
  {data ? (
    <>
         
            <View style={styles.postContainer}>
              <Image style={styles.postImage} source={{ uri: data.picture }} />
              <Text>Job title :</Text>
              <Text style={styles.postDescription}>{data[0] && data[0].job.title}</Text>
              <Text>Offer Price :</Text>
              <Text style={styles.postDescription}>{data[0] && data[0].offer_id.offerPrice}</Text>
              <Text>Job Description :</Text>
              <Text style={styles.postDescription}>{data[0] && data[0].job.description}</Text>
              <Text>Hours spent-- seconds :</Text>
              <Text style={styles.postDescription}>{data[0] && data[0].total_hours }</Text>
              <Text>Total income :</Text>
              <Text style={styles.postDescription}>{data[0] && data[0].total_income }</Text>
            </View>   

          
                {status == 'upcoming' ? <ClockInOut job_id={data[0] && data[0].job._id} offer_id = {data[0] && data[0].offer_id._id} emp_id={data[0] && data[0]._id} /> : <></>}    
                {status == 'pending' ? <Button>Delete offer</Button> : <></>} 
                {status == 'ongoing' ? <ClockInOut job_id={data[0] && data[0].job._id} offer_id = {data[0] && data[0].offer_id._id} emp_id={data[0] && data[0]._id} /> : <></>} 
         
      
    </>
  ) : (
    <>
      <Text>nothing {filteredData.length} found</Text>
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
    padding: 5,
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
    paddingLeft: 40,
    paddingRight:40,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%', // Set width to stretch to maximum width
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  postImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
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
});

export default JobFull;
