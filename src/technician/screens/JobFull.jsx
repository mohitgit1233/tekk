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
              <Box borderWidth={0} borderRadius={5} overflow="hidden"  bg="white" width="100%" >
              {status === 'pending'? <>
              <Text style={styles.postTitle}>{data.jobID && data.jobID.title}</Text>
              <Image style={styles.postImage} source={{ uri: data.jobID && data.jobID.images[0] }} />
              <Text style={styles.postDescription}>{data.jobID && data.jobID.description}</Text>
              <View style={styles.labeltextwrap}>

                <View style={styles.labeltextout}>
              <Text style={styles.label}>Offer Price:</Text>
              <Text style={styles.postText}> {data && data.offerPrice}</Text>
              </View>
              
              <View style={styles.labeltextout}>
              <Text style={styles.label}>Offer Hours:</Text>
              <Text style={styles.postText}> {data && data.offerHours}</Text>
              </View>


              <View style={styles.labeltextout}>
              <Text style={styles.label}>Start date:</Text>
              <Text style={styles.postText}> ${data && Moment(data.prefer_start_date).format('D/MM/YYYY')}</Text>
              </View>

              </View>

                
                  
              </>:
              
                <>
                  <Text style={styles.postTitle}>{data[0] && data[0].job.title}</Text>
                <Image style={styles.postImage} source={{ uri: data[0] && data[0].job.images[0] }} />
                <Text style={styles.postDescription}> {data[0] && data[0].job.description}</Text>
                <View style={styles.labeltextwrap}>

                    <View style={styles.labeltextout}>
                    <Text style={styles.label}>Offer Price:</Text>
                    <Text style={styles.postText}> {data[0] && data[0].offer_id.offerPrice}</Text>
                    </View>

                    


                    <View style={styles.labeltextout}>
                    <Text style={styles.label}>Hours spent (seconds):</Text>
                    <Text style={styles.postText}> ${data[0] && data[0].total_hours.toFixed(2)}</Text>
                    </View>

                    <View style={styles.labeltextout}>
                    <Text style={styles.label}>Total income:</Text>
                    <Text style={styles.postText}> ${data[0] && data[0].total_income.toFixed(2)}</Text>
                    </View>

                </View>
              
               
                </>
                 }
              </Box>

              {status === 'upcoming' ? (
                <ClockInOut job_id={data[0] && data[0].job._id} offer_id={data[0] && data[0].offer_id._id} emp_id={data[0] && data[0]._id} />
              ) : null}

              {status === 'pending' ? (
                <TouchableOpacity style={styles.botton} >
                <Text style={styles.btntxt}>Delete Offer</Text>
              </TouchableOpacity>
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
    fontSize: 25,
    fontWeight: 'bold',
    margin:10,
    textAlign:'center',
    paddingTop:20
  },
  postDescription: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
  },
  button: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: '#e91e63',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
    
  },
  nothingText: {
    fontSize: 18,
    color: 'gray',
  },botton:{
    backgroundColor: '#0D937D',
    paddingVertical: 15,
    paddingHorizontal: 100,
    // borderRadius: 30,
    marginTop: 20,
    marginBottom: 20,
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
    width:'100%',
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
  }, btntxt:{
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});


export default JobFull;
