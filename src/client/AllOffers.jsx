import React, { useEffect, useState,useContext } from 'react'
import { Box, FlatList, Center, NativeBaseProvider, Text, Button, ScrollView, View } from "native-base";
import Moment from 'moment';
import { StyleSheet, TouchableOpacity,TextInput,Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { getOffersByJobId,getJobById,acceptOffer, createRoom } from '../../services/api';

import AppContext from '../../AppContext';

const AllOffers = (props) => {
  const { loggedInUser, setLoggedInUser } = useContext(AppContext);


    // const emp_id = '63f1b9adcf55c1d5b65f58ad'
    const [jobData,setJobData] = useState([])
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
    const fetchDataJob = async () => {
      const JobData = await getJobById(id);
      setJobData(JobData);
      };
      fetchDataJob();

    const fetchData = async () => {
    const offersData = await getOffersByJobId(id);
    console.log("chekkkkkkkkkkkkkkkkkkkkkkkkkkkk");
    
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
                employer_id:loggedInUser.id,
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
    const goToChatRoom = async (jid,tid,eid) =>{
        const obj = {
          "technician": tid,
          "employer": eid,
          "job": jid
      }
     
          const json = await createRoom(null,obj);

          console.log("asskjdkjldaskdsajlkdasjkldasjklsadjkldas created room");

          navigation.navigate('SubChatClient', {  });

  }
  return (
    <View>
       <View style={styles.jobPostContainer}>
              
              <Text style={styles.jobPostTitle}>{jobData.title}</Text>
              <Image style={styles.postImage} source={jobData.images ? { uri: jobData.images[0] }:{uri:"https://dummyimage.com/600x400/666666/c4c4c4&text=No+Image+found"}} />
              <Text style={styles.postDescription}>{jobData.description}</Text>
              {/* <Text style={styles.postDate}>{Moment(jobData.posted_date).format('D MMMM YYYY')}</Text> */}
    
            </View>
    {filteredData.map((post) => {
        Moment.locale('en');
        return (
         
            <View key={post._id} style={styles.postContainer}>
              <View>

              
                <View style={styles.postTitle}>
                  <Text style={styles.postTitle}>{post.technician_who_offered.name}</Text>
                  <Text style={styles.postSubtitleText}>Estimated Hours:{post.offerHours}</Text>
                  <Text style={styles.postSubtitleText}>Estimated Price:{post.offerPrice}</Text>
                  <Text style={styles.postSubtitleText}>Start date:{Moment(post.prefer_start_date).format('D MMMM YYYY')}</Text>
                  <TouchableOpacity style={{marginTop:10}}
                title="Chat"
                onPress={() => {goToChatRoom(id,post.technician_who_offered._id, loggedInUser.id)}}
                //   jobId={jobId}
                ><Text style={{textDecorationLine:'underline',textAlign:'left',color:'#0D937D'}}>Start Negotiation</Text></TouchableOpacity>
                </View>
                </View>
            <View style={{display:'flex',flexDirection:'row', justifyContent:'center'}}>
             
                <TouchableOpacity style={{margin:10}}
                title="Decline"
                // onPress={() => {handleClick(post._id,post.technician_who_offered._id)}}
                //   jobId={jobId}
                ><AntDesign name="closecircle" size={44} color="#FF0C0C" /></TouchableOpacity>
              <TouchableOpacity style={{margin:10}}
                title="Accept"
                onPress={() => {handleClick(post._id,post.technician_who_offered._id)}}
                //   jobId={jobId}
                ><AntDesign name="checkcircle" size={44} color="#0D937D" /></TouchableOpacity>
            </View>
            
        </View>

        );
      })}
      </View>
  )
}
const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },jobPostContainer:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      margin:20,
      borderBottomWidth:1,
      paddingBottom:10,
      paddingTop:5
    }
    ,filterContainer: {
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
      margin:20,
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
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'

    },
    jobPostTitle:{
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    postTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color:'#0D937D'
    },
    postDescription: {
      fontSize: 16,
      marginBottom: 10,
    },
    postImage: {
      width: 300,
      height: 200,
      marginRight: 10,
      marginBottom:10
    },
  })

export default AllOffers