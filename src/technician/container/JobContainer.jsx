import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import Moment from 'moment';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getJobById } from '../../../services/api';

const JobContainer = ({ job, refreshData }) => {
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
    <View style={styles.container}>
      <Image style={styles.postImage} source={{ uri: post.picture }} />
      <Text style={styles.postDescription}>{post.title}</Text>
      <Text style={styles.postDescription}>{post.description}</Text>
      <Text style={styles.postDescription}>Posted: {Moment(post.posted_date).format('d/MM/YYYY')}</Text>
      <Text style={styles.postDescription}>Prefered Start: {Moment(post.prefer_start_date).format('d/MM/YYYY')}</Text>
      <Button title="Send Offer" onPress={handleSendOffer} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  postDescription: {
    fontSize: 18,
    marginBottom: 10,
  },
  postImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
});

export default JobContainer;
