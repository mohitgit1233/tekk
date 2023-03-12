import React, { useEffect, useState } from 'react'
import { Box, FlatList, Center, NativeBaseProvider, Text, Button, ScrollView, View } from "native-base";
import Moment from 'moment';
import { StyleSheet, TouchableOpacity,TextInput,Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { getOffersByJobId,acceptOffer } from '../../services/api';

const AllOffers = () => {

    const emp_id = '63f1b9adcf55c1d5b65f58ad'
    const [data, setData] = useState([]);
    const[accept_id,SetAcceptID] = useState('')
  const [searchTerm, setSearchTerm] = useState('');
  // const [postStatus, setpostStatus] = useState('all')
  const { params } = useRoute();
  const { id } = params;
    const navigation = useNavigation()
  console.log(id)
 
  // const url = `http://localhost:5001/api/v1/job/${id}/offers`;

  useEffect(() => {
    // fetch(url)
    //   .then((resp) => resp.json())
    //   .then((json) => setData(json))
    //   .catch((error) => console.error(error));

    const fetchData = async () => {
    const offersData = await getOffersByJobId(id);
    console.log("chekkkkkkkkkkkkkkkkkkkkkkkkkkkk");
    console.log(offersData);
    setData(offersData);
    };
    fetchData();
    
  }, []);

//   const showToast = () => {
//     Toast.show({
//       type: 'success',
//       text2: 'Post created successfully'
//     });
//   }

     const filteredData = data
    console.log(data)

    const handleClick = async (pid,teid) =>{
        console.log(pid)
            const offer = {
                technician_id:teid,
                employer_id:emp_id,
                offer_id: pid,
                jobID:id       
            };

            // fetch(`http://localhost:5001/api/v1/offers/${pid}/accept`, {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(offer)
            // })
            // .then((response) => {response.json()
            // console.log(response)
            // useEffect
            // })
            // .catch(error => console.error(error));

            const data1 = await acceptOffer(id,offer);

            navigation.goBack();
    }
  return (
    <>
    {filteredData.map((post) => {
        Moment.locale('en');
        return (
         
            <View key={post._id} style={styles.postContainer}>
                <View style={styles.postTitle}>
                  <Text style={styles.postTitle}>Name :{post.technician_who_offered.name}</Text>
                  <Text style={styles.postSubtitleText}>Estimated Hours:{post.offerHours}</Text>
                  <Text style={styles.postSubtitleText}>Estimated Price:{post.offerPrice}</Text>
                  <Text style={styles.postSubtitleText}>Start date:{Moment(post.prefer_start_date).format('D MMMM YYYY')}</Text>
                </View>

            <View style={{display:'flex',flexDirection:'row', justifyContent:'center'}}>
             <Button style={{margin:10}}
                title="Accept"
                onPress={() => {handleClick(post._id,post.technician_who_offered._id)}}
                //   jobId={jobId}
                >Accept</Button>
                <Button style={{margin:10}}
                title="Decline"
                // onPress={() => {handleClick(post._id,post.technician_who_offered._id)}}
                //   jobId={jobId}
                >Decline</Button>
                <Button style={{margin:10}}
                title="Chat"
                // onPress={() => {handleClick(post._id,post.technician_who_offered._id)}}
                //   jobId={jobId}
                >Chat</Button>
            </View>
        
        </View>

        );
      })}
      </>
  )
}
const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },filterContainer: {
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

export default AllOffers