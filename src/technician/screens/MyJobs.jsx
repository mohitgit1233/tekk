// import React, { useState, useEffect } from "react";
import { Box, FlatList, Center, NativeBaseProvider, Text, Button, ScrollView, View } from "native-base";
import Moment from 'moment';
import { StyleSheet, TouchableOpacity,TextInput,Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { getOffersByTechId } from '../../../services/api';
import React, { useState, useEffect,useContext } from 'react';
import AppContext from '../../../AppContext';
// const tech_id = '63f17ce257353e03afc8f124'

export const MyJob = ({ navigation }) => {
  const { loggedInUser, setLoggedInUser } = useContext(AppContext);

  const data2 = [];
  const [data, setData] = useState([]);
  const [Offers,setOffers] = useState([]);
  const [jobStatus, setJobStatus] = useState('ongoing');
  const [searchTerm, setSearchTerm] = useState('');
  // const url = "http://localhost:5001/api/v1/jobs";

  // const urlOffer = `http://localhost:5001/api/v1/technician/${tech_id}/offers`

  useEffect(() => {
    // const fetchData = async() =>{
    //   try {
    //     const response = await fetch(url);
    //     const json = await response.json();
    //     setData(json);
      
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
    // fetchData()

    const fetchOfferData = async() =>{
      // try {
      //   const response = await fetch(urlOffer);
      //   const json = await response.json();
      //   setOffers(json);
      
      // } catch (error) {
      //   console.error(error);
      // }
      const json = await getOffersByTechId(loggedInUser.id)
      setOffers(json);
    }
    fetchOfferData()
  }, []);

  if(Offers.length > 0){
    // Offers.map((jobID) =>{
    // setData(...data,Offers.jobID)}
    // )
    for(let i = 0; i < Offers.length;i++){
      console.log('sss',Offers[i].offerStatus)
      data2.push(Offers[i])
    }

    
  }

  console.log(data2)


  const filteredData = Offers.filter((post) => post.offerStatus === jobStatus  );

  console.log('ddddd',filteredData.length)
  
  return (
    <Box bg="white" height="100%">
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
      <View style={styles.filterContainer}>
        <Button variant={jobStatus === 'ongoing' ? 'solid' : 'outline'} onPress={() => setJobStatus('ongoing')} mr={2} mb={2}>Ongoing</Button>
        <Button variant={jobStatus === 'upcoming' ? 'solid' : 'outline'} onPress={() => setJobStatus('upcoming')} mr={2} mb={2}>Upcoming</Button>
        <Button variant={jobStatus === 'pending' ? 'solid' : 'outline'} onPress={() => setJobStatus('pending')} mb={2}>Pending</Button>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
       {filteredData.length > 0 ?  
        <>
        {filteredData.map((post) => {
          Moment.locale('en');
          return (
            post.jobID === null ? (
              <TouchableOpacity key={post._id} onPress={() => navigation.navigate('JobFull', {id: post._id,status:post.offerStatus})}>
                <View style={styles.postContainer}>
                  <Text>job id null. check backend</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity key={post._id} onPress={() => navigation.navigate('JobFull', {id: post._id,status:post.offerStatus})}>
              <View style={styles.postContainer}>
  <View style={styles.postTitleContainer}>
    <Image style={styles.postImage} source={{ uri: post.jobID.images[0] }} />
    <View style={styles.postContent}>
      <Text style={[styles.postTitle]}>{post.jobID.title}</Text>
      <Text>
        <Text style={{ fontWeight: 'bold' }}></Text>{' '}
        {Moment(post.jobID.posted_date).format('M/DD/YYYY')}
      </Text>
      <Text style={styles.postDescription}>{post.jobID.description}</Text>
    </View>
  </View>
</View>


              </TouchableOpacity>
            )
          );
        })}</>: <Text>Nothing found</Text>}
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
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
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    height: 40,
    flex: 1,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
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
  postContent: {
    flex: 1
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  postDate: {
    fontSize: 14,
    color: '#888888',
  },
  postContainer: {
    backgroundColor: '#FFFFFF',
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
  postTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
