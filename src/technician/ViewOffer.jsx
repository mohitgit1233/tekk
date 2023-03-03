import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Moment from 'moment';

const ViewOffer = ({ route }) => {
  const { offer } = route.params;
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5001/api/v1/offers/${offer._id}`)
      .then(response => response.json())
      .then(data => setJob(data))
      .catch(error => console.error(error));
  }, [offer.jobID]);

  const handleAccept = () => {
    fetch(`http://localhost:5001/api/v1/offers/${offer._id}/accept`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ offer_id: offer._id })
    })
    .then(response => response.json())
    .then(data => {
      setJob(data);
      route.params.refreshData();
    })
    .catch(error => console.error(error));
  };

  const handleDecline = () => {
    fetch(`http://localhost:5001/api/v1/offers/${offer._id}/decline`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ offer_id: offer._id })
    })
    .then(response => response.json())
    .then(data => {
      setJob(data);
      route.params.refreshData();
    })
    .catch(error => console.error(error));
  };

  if (!offer) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.offerDetail}>{offer.offerPrice}</Text>
      <Text style={styles.offerDetail}>{offer.offerHours}</Text>
      <Text style={styles.offerDetail}>{Moment(offer.prefer_start_date).format('d/MM/YYYY')}</Text>
      {offer.isAccepted === null && (
        <View style={styles.buttonContainer}>
          <Button title="Accept" onPress={handleAccept} />
          <Button title="Decline" onPress={handleDecline} />
        </View>
      )}
      {offer.isAccepted === true && (
        <Text style={styles.offerAccepted}>Offer accepted</Text>
      )}
      {offer.isAccepted === false && (
        <Text style={styles.offerDeclined}>Offer declined</Text>
      )}
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
  offerDetail: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    backgroundColor:'green'
  },
  offerAccepted: {
    fontSize: 18,
    marginBottom: 10,
    color: 'green',
  },
  offerDeclined: {
    fontSize: 18,
    marginBottom: 10,
    color: 'red',
  },
});

export default ViewOffer;
