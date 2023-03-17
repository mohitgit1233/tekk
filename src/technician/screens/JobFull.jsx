import React, { useEffect, useState } from 'react'
import { Box, FlatList, Center, NativeBaseProvider, Text, Button, ScrollView, View, VStack } from "native-base";
import Moment from 'moment';
import { StyleSheet, TouchableOpacity,TextInput,Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import ClockInOut from './ClockInOut';
import { getEmploymentByOfferId, getOffersById } from '../../../services/api';

const JobFull = () => {
    const [data, setData] = useState([]);
    const navigation = useNavigation();
    
  const [searchTerm, setSearchTerm] = useState('');
  const [postStatus, setpostStatus] = useState('all')
  const { params } = useRoute();
  const { id,status } = params;
  let filteredData = []
    
  
  // const url = `http://localhost:5001/api/v1/offer/${id}/employment`;
    
  useEffect(() => {
    const see = async()=>{
      //   await fetch(url)
      // .then((resp) => resp.json())
      // .then((json) => setData(json))
      // .catch((error) => console.error(error));
      if (status === 'pending'){
        const json = await getOffersById(id);
        setData(json)
      }else{
        const json = await getEmploymentByOfferId(id);
        setData(json)
      }
 
    }
    see()
  }, []);

console.log('see',status)

console.log('submit',data)
        
//   console.log("data",data[0].employment_status)

  return (
    <Box flex={1} bg="white" p={2} >
      <ScrollView contentContainerStyle={styles.container}>
        {data ? (
          <>
            <VStack space={3} alignItems="center">
              <Box borderWidth={1} borderRadius={5} overflow="hidden" borderColor="gray.200" bg="white" width="100%" >
              {status === 'pending'? <>
              <Image style={styles.postImage} source={{ uri: data.jobID && data.jobID.images[0] }} />
              <VStack space={3} p={4}>
                  <Text style={styles.postTitle}>Job title:</Text>
                  <Text style={styles.postDescription}>{data.jobID && data.jobID.title}</Text>
                  <Text style={styles.postTitle}>Offer Price:</Text>
                  <Text style={styles.postDescription}>{data && data.offerPrice}</Text>
                  <Text style={styles.postTitle}>Offer Hours:</Text>
                  <Text style={styles.postDescription}>{data && data.offerHours}</Text>
                  <Text style={styles.postTitle}>Start date:</Text>
                  <Text style={styles.postDescription}>{data && Moment(data.prefer_start_date).format('D/MM/YYYY')}</Text>
                  </VStack>
              </>:
              
                <>
                <Image style={styles.postImage} source={{ uri: data[0] && data[0].job.images[0] }} />
                <VStack space={3} p={4}>
                  <Text style={styles.postTitle}>Job title:</Text>
                  <Text style={styles.postDescription}>{data[0] && data[0].job.title}</Text>
                  <Text style={styles.postTitle}>Offer Price:</Text>
                  <Text style={styles.postDescription}>{data[0] && data[0].offer_id.offerPrice}</Text>
                  <Text style={styles.postTitle}>Job Description:</Text>
                  <Text style={styles.postDescription}>{data[0] && data[0].job.description}</Text>
                  <Text style={styles.postTitle}>Hours spent (seconds):</Text>
                  <Text style={styles.postDescription}>{data[0] && data[0].total_hours.toFixed(2)}</Text>
                  <Text style={styles.postTitle}>Total income:</Text>
                  <Text style={styles.postDescription}>{data[0] && data[0].total_income.toFixed(2)}</Text>
                </VStack>
                </>
                 }
              </Box>

              {status === 'upcoming' ? (
                <ClockInOut job_id={data[0] && data[0].job._id} offer_id={data[0] && data[0].offer_id._id} emp_id={data[0] && data[0]._id} />
              ) : null}

              {status === 'pending' ? (
                <Button style={styles.button}>Delete offer</Button>
              ) : null}

              {status === 'ongoing' ? (
                <ClockInOut job_id={data[0] && data[0].job._id} offer_id={data[0] && data[0].offer_id._id} emp_id={data[0] && data[0]._id} />
              ) : null}
            </VStack>
          </>
        ) : (
          <Center flex={1}>
            <Text style={styles.nothingText}>Nothing found</Text>
          </Center>
        )}
      </ScrollView>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: '#e91e63',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  nothingText: {
    fontSize: 18,
    color: 'gray',
  },
});


export default JobFull;
