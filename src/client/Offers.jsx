import React, { useEffect, useState , useContext} from 'react'
import { Box, FlatList, Center, NativeBaseProvider, Text, Button, ScrollView, View } from "native-base";
import Moment from 'moment';
import { StyleSheet, TouchableOpacity,TextInput, Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getJobsByEmployerId } from '../../services/api';
import AppContext from '../../AppContext';
import { UserAuth } from '../context/AuthContext';


//Requests
const Offers = () => {
  const { user } = UserAuth();
    const [data, setData] = useState([]);
    const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  // const [postStatus, setpostStatus] = useState('all')
  
 

  useEffect( () => {
    const unsubscribe = navigation.addListener('focus', () => {
      const see = async ()=>{
        const json = await getJobsByEmployerId(user._id)
        setData(json)
      }
      see()
    });
    // fetch(url)
    //   .then((resp) => resp.json())
    //   .then((json) => setData(json))
    //   .catch((error) => console.error(error));
    const see = async ()=>{
      const json = await getJobsByEmployerId(user._id)
      setData(json)
    }
    see()
    return unsubscribe;
  }, [navigation]);

     const filteredData = data.filter(post => post.status === 'offered' && post.title.toLowerCase().includes(searchTerm.toLowerCase())).sort((a, b) => new Date(b.posted_date) - new Date(a.posted_date));

     console.log(filteredData)

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

      <ScrollView contentContainerStyle={styles.container}>
        {
        filteredData.length > 0 ? <>
        {filteredData.map((post) => {
          Moment.locale('en');
          return (
            <TouchableOpacity style={styles.postContainerP} key={post._id} onPress={() => navigation.navigate('AllOffers', {id: post._id})}>
              <View style={styles.postContainer}>
              <Image source={{ uri:  post.images[0] }} style={{  width: 150,height: 100,marginRight: 10,borderRadius: 10 }} />
                <View>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postDate}>{Moment(post.posted_date).format('D MMMM YYYY')}</Text>
                <Text style={styles.postDescription}>{post.description.length > 20 ? post.description.split(' ').slice(0, 8).join(' ') + '......'  : post.description.split(' ').slice(0, 8).join(' ')}</Text>
                <Text style={styles.OfferCount}>{post.countOffer} offers</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
        </> :<>
        <Text>nothing found</Text>
        </>
        }
      </ScrollView>
    </Box>
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
      OfferCount:{
        color:'#0D937D',
        fontSize:16,
        borderWidth:1,
        borderRadius:5,
        maxWidth:80,
        textAlign:'center',
        borderColor:'#0D937D'
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
      marginRight: 10,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
    },
    postContainer: {
      flexDirection: 'row',
  paddingBottom:15,
  paddingTop:15,
  paddingLeft:5,
  paddingRight:5,
  borderBottomWidth: 1,
  borderBottomColor: '#ccc',
  backgroundColor:'#F9F8F5',
 
   
    },
    postContainerP: {
      width: '100%'
    },
    postTitle: {
      fontSize: 20,
      fontWeight: 'bold',
     
    },
    postDescription: {
      fontSize: 16,
      marginBottom: 10,
      maxWidth:190
    },
  
  })

export default Offers