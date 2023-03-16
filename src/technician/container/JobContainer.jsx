import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button,ScrollView,FlatList, TouchableOpacity } from 'react-native';
import Moment from 'moment';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getJobById } from '../../../services/api';

const JobContainer = ({ job, refreshData }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  
  const navigation = useNavigation();
  const [post, setPost] = useState(null);
  const { params } = useRoute();
  const { id,tech_id } = params;

  console.log('in container',tech_id)
  useEffect(() => {
    // fetch(`http://localhost:5001/api/v1/jobs/${id}`)
    //   .then((resp) => resp.json())
    //   .then((json) => setPost(json))
    //   .catch((error) => console.error(error));
    const see = async () => {
      const json = await getJobById(id)
      setPost(json)
    }
    see()
  }, [id]);

  const handleSendOffer = () => {
    navigation.navigate('SendOffer', { jobId: post._id,tech_id:tech_id });
  };

  if (!post) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text style={styles.postDate}>Posted: {Moment(post.posted_date).format('d/MM/YYYY')}</Text>
      <ScrollView horizontal={true} style={styles.imageCarousel}>
        {post.images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </ScrollView>
      <View style={styles.postDetails}>
        <Text style={styles.postDescription}>{post.description}</Text>
        
        <View style={styles.labeltextwrap}>
                <View style={styles.labeltextout}>
              <Text style={styles.label}>Location:</Text>
              <Text style={styles.postText}> {post.location}</Text>
              </View>
              
              <View style={styles.labeltextout}>
              <Text style={styles.label}>Preferred Start Date:</Text>
              <Text style={styles.postText}> {Moment(post.prefer_start_date).format('d/MM/YYYY')}</Text>
              </View>

       
        </View>


      </View>
      
      
      <TouchableOpacity style={styles.sendOfferButton} onPress={handleSendOffer}>
        <Text style={styles.sendOfferButtonText}>Send a Quote</Text>
      </TouchableOpacity>
      {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
    </View>
    </ScrollView>
  );
  
  
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 30,
   
  },
  postDate: {
    fontSize: 14,
    textAlign:'left'
    ,marginBottom:20
  },
  postTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
   
    width:"100%",
    alignItems: 'flex-start',
    
  },
  imageCarousel: {
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: 350,
    height: 200,
    marginRight: 10,
  },
  postDetails: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  postDescription: {
    fontSize: 18,
  
  },
  sendOfferButton: {
    backgroundColor: '#0D937D',
    paddingVertical: 15,
    paddingHorizontal: 30,
    // borderRadius: 30,
    marginTop: 10,
    marginBottom: 20,
    width:'100%'
  },
  sendOfferButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },labeltextwrap:{
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
  },
  postText:{
      fontSize:17,
      
  },
  labeltextwrap:{
    display:'flex',
    flexDirection:'column',
    marginTop:10,
    justifyContent:'space-between',
    width:'100%'
  },
  labeltextout:{
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
  
  }
});
export default JobContainer;
