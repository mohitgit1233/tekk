import { useState,useContext,useEffect } from 'react';
import {Box} from 'native-base'
import { Button, TextInput, View,StyleSheet,Text,Image,FlatList , ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { CommonActions } from '@react-navigation/native';
import { postJobs,pushToTechnicians } from '../../services/api';
import AppContext from '../../AppContext';
import * as ImagePicker from 'expo-image-picker';
import { updateTechnicianImage, patchJobImages } from '../../services/api';
// import Toast from 'react-native-toast-message';
import { getMessages,getUserById, getCompletionsOpenAI, getJobById } from '../../services/api';

// import { Picker } from '@react-native-picker/picker';
const CreatePost = () => {
  // const [image, setImage] = useState(null);
  // const [suggestedReplies, setSuggestedReplies] = useState("empty");


  const getGeneratedAd = async (message="") => {
    console.log("getGeneratedAd()");

    try {
      setLoading(true);

      const data = await getCompletionsOpenAI(null, {
        message: message,
      });

      console.log("raaaaaaaaaaaaaaaaaaaaaaaaaaaa", data);

      const completions = data.choices.map((choice) => choice.text.trim());
      setJobDescription(completions[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

      const see = async () => {
          // await getGeneratedAd(`Create a 500-word ad description to help me hire a technician based on this: job: painting, address: richmond, payment: 1000, start-date: 23rd Oct`);
      }

      see()

}, []);


  const pickImages = async () => {
    let results = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      multiple: true, // enable multiple image selection
    });
  
    if (!results.canceled) {
      setImages([...images, ...results.assets.map((asset) => asset.uri)]);
    }
  };

  const { loggedInUser, setLoggedInUser } = useContext(AppContext);

    const [clientId,setClientId] = useState(loggedInUser.id)
    // const { refreshData} = route.params;
    const [postTitle, setPostTitle] = useState('');
    const [postAddress, setPostAddress] = useState('');
    const [postPhone, setPostPhone] = useState('');
    const [postMaxCost, setPostMaxCost] = useState('');
    const [startDate,setStartDate] = useState(new Date())
    const [jobDescription,setJobDescription] = useState('')
    const [loading, setLoading] = useState(false);

    const [images,setImages] = useState([])
    const [open, setOpen] = useState(false);

  const [value, setValue] = useState(null);
  const skills = [
    {label: 'Electrician', value: 'electrician'},
    {label: 'Carpenter', value: 'carpenter'},
    {label: 'Plumber', value: 'plumber'}
  ]
  const [items, setItems] = useState(skills);
  const [requirement,setRequirement] = useState(skills[0].value)
  const navigation = useNavigation();
    const [chosenDate, setChosenDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(true);
    const onDateChange = (event, newDate) => {
    //   setShowPicker(false);
      if (newDate !== undefined) {
        setStartDate(newDate);
      }
    }
    const handleSendOffer = async () => {
      const offer = {
        client_id: clientId,
        title:postTitle,
        description:jobDescription,
        skills_required:requirement,
        max_cost:postMaxCost,
        prefer_start_date:startDate,
        location:postAddress        
      };
  

      // fetch('http://localhost:5001/api/v1/jobs', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(offer)
      // })
      // .then(response => response.json())
      // .then(data => {
      //   navigation.navigate('MyPosts');
      // })
      // .catch(error => console.error(error));

      const json = await postJobs(null,offer)
      console.log("jshonnnnnnnn");
    console.log(json._id);
      //upload job images
      const formData = new FormData();
      for (let i =0; i<images.length;i++)
      {
        formData.append('images_ar', {
          uri: images[i],
          name: `postimg${i}.jpg`,
          type: 'image/jpeg',
        });
      }

      const json2 = await patchJobImages(json._id, formData)

      //push notification to all the technicianssssssssssss
      const obj1 = {
        "heading": "New Job Added",
    "text": `employer ${loggedInUser.name} looking for a ${requirement}`
}
      const json3 = await pushToTechnicians(null,obj1)

      navigation.goBack();
    };
    return (
      <FlatList
        contentContainerStyle={styles.container}
        data={[1]}
        keyExtractor={() => 'dummy-key'}
        renderItem={() => (
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <View style={styles.labelinputwrapper}>
                <TextInput
                  placeholder="Job Title"
                  value={postTitle}
                  style={styles.input}
                  onChangeText={setPostTitle}
                />
              </View>
      
              <View style={styles.labelinputwrapper}>
                <TextInput
                  placeholder="Address"
                  value={postAddress}
                  style={styles.input}
                  onChangeText={setPostAddress}
                />
              </View>
      
              <View style={styles.labelinputwrapper}>
                <TextInput
                  placeholder="Phone Number"
                  value={postPhone}
                  style={styles.input}
                  onChangeText={setPostPhone}
                  keyboardType="numeric"
                />
              </View>
      
              <View style={styles.labelinputwrapper}>
                <TextInput
                  placeholder="Maximum Cost"
                  value={postMaxCost}
                  style={styles.input}
                  onChangeText={setPostMaxCost}
                  keyboardType="numeric"
                />
              </View>
      
              <View style={styles.labelinputwrapper}>
              <View style={styles.container1}>
            <TextInput
              placeholder="Description"
              value={jobDescription}
              style={styles.description}
              onChangeText={setJobDescription}
              multiline={true}
              numberOfLines={4}
            />
            <TouchableOpacity style={styles.fillButton} onPress={() => getGeneratedAd(`Create a 500-word ad description to help me hire a technician based on this: title: ${postTitle}, job: ${requirement}, address: ${postAddress}, payment: ${postMaxCost}, start-date: ${startDate}`)}>
              {loading ? <ActivityIndicator size="small" color="#FFFFFF" /> : <Text style={{ color: 'white' }}>Auto Generate</Text>}
            </TouchableOpacity>
          </View>
              </View>
      
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowPicker(true)}
              >
                <Text style={styles.inputLabel}>Preferred Start Date</Text>
                {showPicker && (
                  <View style={{ display: 'flex', justifyContent: 'center' }}>
                    <DateTimePicker
                      style={{ marginRight: 100, marginTop: 6, marginBottom: 6, borderBottomWidth: 0 }}
                      value={startDate}
                      mode="date"
                      onChange={onDateChange}
                    />
                  </View>
                )}
              </TouchableOpacity>
      
              <View style={styles.labelinputwrapper}>
                <DropDownPicker
                  style={styles.dropdown}
                  open={open}
                  value={requirement}
                  items={items}
                  setOpen={setOpen}
                  setValue={setRequirement}
                  setItems={setItems}
                  placeholder="Select a requirement"
                  dropDownDirection="up"
                  dropDownContainerStyle={styles.dropDownContainer}
                />
              </View>
            </View>
      
            <TouchableOpacity style={styles.addImagesButton} onPress={pickImages}>
              <Text style={{ color: 'white', textAlign: 'center' }}>Add Site Images</Text>
            </TouchableOpacity>
            <FlatList
              horizontal={true}
              data={images}
              renderItem={({ item }) => (
                <Image source={{ uri: item }} style={{ width: 200, height: 200 }} />
              )}
              keyExtractor={(item) => item}
            />
      
            <TouchableOpacity style={styles.botton} onPress={handleSendOffer}>
              <Text style={styles.btntxt}>Submit Post</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      
        );
      }
      const styles = StyleSheet.create({
        container: {
          // flex: 1,
          padding: 10,
        },
        formContainer: {
          backgroundColor: '#FFFFFF',
          borderRadius: 8,
          padding: 16,
        },
        label: {
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 8,
        },
        input: {
          borderBottomWidth: 1,
          borderColor: '#404040',
          borderRadius: 8,
          paddingHorizontal: 16,
          paddingVertical: 12,
          marginBottom: 16,
          fontSize: 16,
        },
        description: {
          borderWidth: 1,
          borderColor: '#404040',
          height: 120,
          borderRadius: 8,
          paddingHorizontal: 16,
          paddingVertical: 12,
          marginBottom: 16,
          fontSize: 16,
        },
        button: {
          backgroundColor: '#5D2DFD',
          padding: 16,
          borderRadius: 8,
          alignItems: 'center',
        },
        buttonText: {
          color: '#FFFFFF',
          fontSize: 16,
        },
        datePickerContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderWidth: 1,
          borderColor: '#CCCCCC',
          borderRadius: 8,
          paddingHorizontal: 16,
          paddingVertical: 12,
          marginBottom: 16,
        },
        dateText: {
          fontSize: 16,
        },
      
        imageinputwrapper: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderStyle: 'dashed',
          borderColor: '#404040',
          height: 150,
          marginTop: 20,
          marginBottom: 20,
          fontSize: 16,
        },
        botton: {
          backgroundColor: '#0D937D',
          paddingVertical: 15,
          paddingHorizontal: 100,
          // borderRadius: 30,
          marginTop: 20,
          marginBottom: 20,
        },
        btntxt: {
          color: '#FFFFFF',
          fontSize: 15,
          fontWeight: 'bold',
          textAlign: 'center',
        },
        addImagesButton: {
      
          backgroundColor: '#0D937D',
          // paddingVertical: 15,
          // paddingHorizontal: 100,
          // borderRadius: 30,
          marginTop: 10,
          marginBottom: 10,
          padding: 12,
      
          width: "50%",
          textAlign: 'center',
          alignSelf: 'center',
          // marginTop:50
        },
        dropdown: {
          zIndex: 999,
          width: '100%',
          marginBottom: 10,
        },
        dropDownContainer: {
          height: 150,
          width: '100%',
          position: 'absolute',
          top: -150,
          zIndex: 999,
        },
        container1: {
          position: 'relative',
        },
        description: {
          height: 100,
          padding: 10,
          borderWidth: 1,
          borderColor: 'gray',
        },
        fillButton: {
          position: 'absolute',
          top: 10,
          right: 10,
          backgroundColor: 'gray',
          borderRadius: 5,
          padding: 5,
          backgroundColor: "#56565661"
        },
      
      
      });
      
      
      export default CreatePost