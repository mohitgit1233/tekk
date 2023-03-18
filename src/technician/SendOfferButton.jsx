// import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//FIXME
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { postOffer,pushToEmployerById, getJobById } from '../../services/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState, useEffect,useContext } from 'react';
import AppContext from '../../AppContext';
import Toast from 'react-native-toast-message';
import Moment from 'moment';

const SendOffer = ({ route }) => {
  const { loggedInUser, setLoggedInUser } = useContext(AppContext);
  const { jobId, refreshData,tech_id } = route.params;
  const [offerPrice, setOfferPrice] = useState('');
  const [offerHours, setOfferHours] = useState('');
  const [preferStartDate, setPreferStartDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const navigation = useNavigation();
  const [showPicker, setShowPicker] = useState(true);
  const onDateChange = (event, newDate) => {
  //   setShowPicker(false);
    if (newDate !== undefined) {
      setPreferStartDate(newDate);
    }
  }
  console.log('in sending',tech_id)

  const handleSendOffer = async () => {
    if (!offerPrice || !offerHours || !preferStartDate) {
      alert('Please fill in all fields.');
      return;
    }
  
    const offer = {
      jobID: jobId,
      offerPrice: parseInt(offerPrice),
      offerHours: parseInt(offerHours),
      technicianId: loggedInUser.id,
      prefer_start_date: preferStartDate,
      
    };

      const json = await postOffer(null, offer);
      const job1 = await getJobById(jobId)


      //push notification to all the technicianssssssssssss
      const obj1 = {
        "heading": `New quote recieved on your job post`,
        "text": `Technician ${loggedInUser.name} added a quote on ${job1.title}`
      }

      const json3 = await pushToEmployerById(job1.employer,obj1)


    Toast.show({
      type: 'success',
      text1: 'Offer sent successfully!',
      visibilityTime: 500,
      position:'bottom',
      autoHide: true,
      onHide: () => {
        navigation.navigate('My Jobs',{ offer: json, refreshData: refreshData });
      },
    });
  };

  return (
    <View style={styles.container}>
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <TextInput
        style={styles.input}
        placeholder="Offer price"
        value={offerPrice}
        onChangeText={setOfferPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Offer hours"
        value={offerHours}
        onChangeText={setOfferHours}
        keyboardType="numeric"
      />

        <TouchableOpacity
              style={styles.input}
              onPress={() => setShowPicker(true)}
            >
              <Text style={styles.inputLabel}>Preferred Start Date</Text>
              {showPicker && (
                <View style={{display:'flex',justifyContent:'center'}}>
                  <DateTimePicker
                  style={{marginRight:100,marginTop:6,marginBottom:6,borderBottomWidth:0}}
                  value={preferStartDate}
                  mode="date"
                  onChange={onDateChange}
                />
                </View>
                
              )}
            </TouchableOpacity>

      <TouchableOpacity style={styles.botton} onPress={handleSendOffer}>
            <Text style={styles.btntxt}>Send Offer</Text>
          </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9F8F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderBottomWidth:1,
    borderColor: '#404040',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 17,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateInputLabel: {
    
    fontSize:20,
    marginTop:10
  },
  dateInputText: {
    borderWidth: 1,
    borderColor: '#0D937D',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop:10,
    marginLeft:20,
    fontSize:17
  },botton:{
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
})

export default SendOffer;
