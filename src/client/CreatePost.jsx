import { useState,useContext } from 'react';
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
  
    if (!results.cancelled) {
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

      navigation.navigate('MyPosts');
    };
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.form}>
          <Text style={styles.heading}>Create Job Post</Text>
    
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Title"
              value={postTitle}
              style={styles.input}
              onChangeText={setPostTitle}
            />
            <TextInput
              placeholder="Address"
              value={postAddress}
              style={styles.input}
              onChangeText={setPostAddress}
            />
            <TextInput
              placeholder="Phone Number"
              value={postPhone}
              style={styles.input}
              onChangeText={setPostPhone}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Maximum Cost"
              value={postMaxCost}
              style={styles.input}
              onChangeText={setPostMaxCost}
            />
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowPicker(true)}
            >
              <Text style={styles.inputLabel}>Pick a date</Text>
              {showPicker && (
                <DateTimePicker
                  style={styles.datePicker}
                  value={startDate}
                  mode="date"
                  onChange={onDateChange}
                />
              )}
            </TouchableOpacity>
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
            <TextInput
              placeholder="Description"
              value={jobDescription}
              style={styles.input}
              onChangeText={setJobDescription}
              multiline={true}
              numberOfLines={4}
            />
            <TouchableOpacity style={styles.addImagesButton} onPress={pickImages}>
              <Text style={styles.addImagesButtonText}>Add Site Images</Text>
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
    
          <TouchableOpacity style={styles.submitButton} onPress={handleSendOffer}>
            <Text style={styles.submitButtonText}>Submit Post</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
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
    borderWidth: 1,
    borderColor: '#CCCCCC',
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
});


export default CreatePost