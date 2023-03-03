import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Moment from 'moment';
import { Calendar } from 'react-native-calendars';

const SendOffer = ({ route }) => {
  const { jobId, refreshData, tech_id } = route.params;
  const [offerPrice, setOfferPrice] = useState('');
  const [offerHours, setOfferHours] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const navigation = useNavigation();

  const handleSendOffer = () => {
    const offer = {
      jobID: jobId,
      offerPrice: parseInt(offerPrice),
      offerHours: parseInt(offerHours),
      prefer_start_date: selectedDate,
      tehnicianId: tech_id,
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

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
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
      <TextInput
    style={styles.textInput}
    placeholder="Select date"
    value={selectedDate}
    editable={false}
  />
      <Calendar
        style={styles.calendar}
        current={Moment().format('YYYY-MM-DD')}
        minDate={Moment().format('YYYY-MM-DD')}
        onDayPress={onDayPress}
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
  calendar: {
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
