import { useState,useContext } from 'react';
import {Box} from 'native-base'
import { Button, TextInput, View,StyleSheet,Text,Image,FlatList , ScrollView, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { CommonActions } from '@react-navigation/native';
import { postJobs,pushToTechnicians } from '../../services/api';
import AppContext from '../../AppContext';
import * as ImagePicker from 'expo-image-picker';
import { updateTechnicianImage, patchJobImages } from '../../services/api';
// import { Picker } from '@react-native-picker/picker';
const CreatePost = () => {
  // const [image, setImage] = useState(null);

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
    const [requirement,setRequirement] = useState(null)
    const [jobDescription,setJobDescription] = useState('')
    const [images,setImages] = useState([])
    const [open, setOpen] = useState(false);

  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Carpenter', value: 'carpenter'},
    {label: 'Electrician', value: 'electrician'},
    {label: 'Plumber', value: 'plumber'}
  ]);
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
      <ScrollView >
      <ScrollView contentContainerStyle={styles.container}>
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
            />

            </View>
            <View style={styles.labelinputwrapper}>  
 
          <TextInput
            placeholder="Description"
            value={jobDescription}
            style={styles.description}
            onChangeText={setJobDescription}
            multiline={true}
            numberOfLines={4}
          />
          </View>
            
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowPicker(true)}
            >
              <Text style={styles.inputLabel}>Preferred Start Date</Text>
              {showPicker && (
                <View style={{display:'flex',justifyContent:'center'}}>
                  <DateTimePicker
                  style={{marginRight:100,marginTop:20,marginBottom:20,borderBottomWidth:0}}
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
            />
            </View>
          </View>
        
          <View style={styles.imageinputwrapper}>  
            <TouchableOpacity style={styles.addImagesButton} onPress={pickImages}>
              <Text >Add Site Images</Text>
            </TouchableOpacity>
            <FlatList
              horizontal={true}
              data={images}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item }}
                  style={styles.imagePreview}
                  resizeMode="cover"
                />
              )}
              keyExtractor={(item) => item}
              style={styles.imageList}
            />
            </View>
    
          <TouchableOpacity style={styles.botton} onPress={handleSendOffer}>
            <Text style={styles.btntxt}>Submit Post</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </ScrollView>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderBottomWidth:1,
    borderColor: '#404040',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  description: {
    borderWidth:1,
    borderColor: '#404040',
    height:150,
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
  dropdownContainer: {
    marginBottom: 16,
  },
  imageinputwrapper:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    borderStyle:'dashed',
    borderColor: '#404040',
    height:150,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 16,
  }, 
  botton:{
    backgroundColor: '#0D937D',
    paddingVertical: 15,
    paddingHorizontal: 100,
    // borderRadius: 30,
    marginTop: 20,
    marginBottom: 20,
  },
  btntxt:{
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addImagesButton:{
    backgroundColor:'white',
    padding:12,
    borderWidth:1,
    textAlign:'center',
    marginTop:50
  }
});


export default CreatePost