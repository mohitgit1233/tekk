import { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SendOffer = ({ route }) => {
  const { jobId, refreshData,tech_id } = route.params;
  const [offerPrice, setOfferPrice] = useState('');
  const [offerHours, setOfferHours] = useState('');
  const [preferStartDate, setPreferStartDate] = useState('');
  const navigation = useNavigation();
  console.log('in sending',tech_id)
  const handleSendOffer = () => {
    const offer = {
      jobID: jobId,
      offerPrice: parseInt(offerPrice),
      offerHours: parseInt(offerHours),
      prefer_start_date: preferStartDate,
      tehnicianId:tech_id
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
    <View>
      <TextInput
        placeholder="Offer price"
        value={offerPrice}
        onChangeText={setOfferPrice}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Offer hours"
        value={offerHours}
        onChangeText={setOfferHours}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Preferred start date"
        value={preferStartDate}
        onChangeText={setPreferStartDate}
      />
      <Button
        title="Send Quote"
        onPress={handleSendOffer}
        jobId={jobId}
      />
    </View>
  );
};

export default SendOffer;
