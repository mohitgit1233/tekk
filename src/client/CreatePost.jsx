import { useState } from 'react';
import { Button, TextInput, View,StyleSheet,Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { CommonActions } from '@react-navigation/native';
import { postJobs } from '../../services/api';

const CreatePost = () => {

    const [clientId,setClientId] = useState('63f1b9adcf55c1d5b65f58ad')
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
      navigation.navigate('MyPosts');
    };
  return (
    <View>
    <TextInput
      placeholder="Title"
      value={postTitle}
      style={styles.field}
      onChangeText={setPostTitle}
      keyboardType="string"
    />
    <TextInput
      placeholder="Address"
      value={postAddress}
      style={styles.field}
      onChangeText={setPostAddress}
      keyboardType="string"
    />
    <TextInput
      placeholder="Phone Number"
      value={postPhone}
      style={styles.field}
      onChangeText={setPostPhone}
      keyboardType='numeric'
    />
    <TextInput
      placeholder="Maximum Cost"
      value={postMaxCost}
      style={styles.field}
      onChangeText={setPostMaxCost}
      keyboardType="string"
    />
     <View style={{textAlign:'center',fontSize:'25',display:'flex',flexDirection:'column',alignItems:'center'}}>
      <Text style={{textAlign:'center',fontSize:'20'
    }}>Pick a date</Text>
      {showPicker && (
        <DateTimePicker
        style={{alignItems:'center' }}
          value={startDate}
          mode="date"
          onChange={onDateChange}
        />
      )}
    </View>
 


    <TextInput
      placeholder="Desciption"
      value={jobDescription}
      style={styles.field}
      onChangeText={setJobDescription}
      keyboardType="string"
    />
      <DropDownPicker
      style={{margin:"auto",marginBottom:10}}
      open={open}
      value={requirement}
      items={items}
      setOpen={setOpen}
      setValue={setRequirement}
      setItems={setItems}
    />
    

    <Button
      title="Submit Post"
      onPress={handleSendOffer}
    //   jobId={jobId}
    />
  </View>
  )
}
const styles = StyleSheet.create({
field:{
    fontSize:'x-large',
    border: '1px solid black',
    padding:'3%',
    textAlign:'center',
    borderWidth: 1,
      borderColor: 'black',
      borderRadius: 10,
      borderStyle: 'solid',
      padding: 10,
     margin:15,
    
     
      
  },
  buton:{
    display:'none'
  }

})

export default CreatePost