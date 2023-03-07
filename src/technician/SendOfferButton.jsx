import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//FIXME
import DateTimePickerModal from "react-native-modal-datetime-picker";

const SendOffer = ({ route }) => {
  const { jobId, refreshData,tech_id } = route.params;
  const [offerPrice, setOfferPrice] = useState('');
  const [offerHours, setOfferHours] = useState('');
  const [preferStartDate, setPreferStartDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const navigation = useNavigation();
  console.log('in sending',tech_id)

  const handleSendOffer = () => {
    if (!offerPrice || !offerHours || !preferStartDate) {
      alert('Please fill in all fields.');
      return;
    }
  
    const offer = {
      jobID: jobId,
      offerPrice: parseInt(offerPrice),
      offerHours: parseInt(offerHours),
      technicianId:'63f17ce257353e03afc8f124',
      prefer_start_date: preferStartDate,
      
    };

    fetch('http://localhost:5001/api/v1/offers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(offer)
    })
    .then(response => response.json())
    .then(data => {
      navigation.navigate('ViewOffer', { offer: data, refreshData: refreshData });
    })
    .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Send Offer</Text>
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
      <View style={styles.dateInputContainer}>
        <Text style={styles.dateInputLabel}>Preferred start date: </Text>
        <Text style={styles.dateInputText} onPress={() => setDatePickerVisibility(true)}>
          {preferStartDate || 'Select date'}
        </Text>
      </View>
      <Button
        title="Send Offer"
        onPress={handleSendOffer}
        jobId={jobId}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={(date) => {
          setPreferStartDate(date.toISOString());
          setDatePickerVisibility(false);
        }}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateInputLabel: {
    fontWeight: 'bold',
  },
  dateInputText: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  }
})

export default SendOffer;
