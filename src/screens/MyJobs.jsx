import React, { useState, useEffect } from "react";
import { Box, FlatList, Center, NativeBaseProvider, Text, Button, ScrollView, View } from "native-base";
import Moment from 'moment';
import { StyleSheet, TouchableOpacity,TextInput,Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';

const tech_id = '63f17ce257353e03afc8f124'

export const MyJob = ({ navigation }) => {

  const data2 = [];
  const [data, setData] = useState([]);
  const [Offers,setOffers] = useState([]);
  const [jobStatus, setJobStatus] = useState('ongoing');
  const [searchTerm, setSearchTerm] = useState('');
  // const url = "http://localhost:5001/api/v1/jobs";

  const urlOffer = `http://localhost:5001/api/v1/technician/${tech_id}/offers`

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
      try {
        const response = await fetch(urlOffer);
        const json = await response.json();
        setOffers(json);
      
      } catch (error) {
        console.error(error);
      }
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
            <TouchableOpacity key={post._id} onPress={() => navigation.navigate('JobContainer', {id: post.jobID._id})}>
              <View style={styles.postContainer}>
              <Image style={styles.postImage} source={{ uri: post.jobID.picture }} />
                <Text style={styles.postTitle}>{post.jobID.title}</Text>
                <Text style={styles.postDescription}>{post.jobID.description}</Text>
                <Text style={styles.postDate}>{Moment(post.jobID.posted_date).format('D MMMM YYYY')}</Text>
              </View>

            </TouchableOpacity>
          );
        })}</>: <Text>Nothing found</Text>}
      </ScrollView>
    </Box>
  );
};

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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
})