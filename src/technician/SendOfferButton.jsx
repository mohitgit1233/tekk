import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Moment from 'moment';
import DatePicker from 'react-native-datepicker';

const SendOffer = ({ route }) => {
  const { jobId, refreshData, tech_id } = route.params;
  const [offerPrice, setOfferPrice] = useState('');
  const [offerHours, setOfferHours] = useState('');
  const [preferStartDate, setPreferStartDate] = useState('');
  const navigation = useNavigation();

  const handleSendOffer = () => {
    const offer = {
      jobID: jobId,
      offerPrice: parseInt(offerPrice),
      offerHours: parseInt(offerHours),
      prefer_start_date: preferStartDate,
      technician_who_offered: tech_id,
    };

    fetch('http://localhost:5001/api/v1/offers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(offer),
    })
      .then((response) => response.json())
      .then((data) => {
        navigation.navigate('ViewOffer', { offer: data, refreshData: refreshData });
      })
      .catch((error) => console.error(error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Offer price"
          value={offerPrice}
          onChangeText={setOfferPrice}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Offer hours"
          value={offerHours}
          onChangeText={setOfferHours}
          keyboardType="numeric"
        />
      </View>
      <DatePicker
        style={styles.datePicker}
        date={preferStartDate}
        mode="date"
        placeholder="Preferred start date"
        format="YYYY-MM-DD"
        minDate={Moment().format('YYYY-MM-DD')}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 36,
          },
        }}
        onDateChange={setPreferStartDate}
      />
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title="Send Quote"
          onPress={handleSendOffer}
          jobId={jobId}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  datePicker: {
    width: 200,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    height: 40,
    backgroundColor: 'blue',
    color: 'white',
  },
});

export default SendOffer;
