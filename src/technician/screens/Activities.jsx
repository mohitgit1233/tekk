// import {AspectRatio,Box,Button,HStack,Image,Text,VStack} from 'native-base';
import { Box, FlatList, Center, NativeBaseProvider, Text, Button, ScrollView, View } from "native-base";
import Moment from 'moment';
import { StyleSheet, TouchableOpacity,TextInput,Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { getOffersByTechId } from '../../../services/api';
import React, { useState, useEffect,useContext } from 'react';
import AppContext from '../../../AppContext';
import { getIncomeHours} from '../../../services/api'


export const Activities = ({ navigation }) => {
  const { loggedInUser, setLoggedInUser } = useContext(AppContext);
  const [income, seti] = useState(0);
  const [hours, seth] = useState(0);


  useEffect( () => {

    const fetchData = async () => {
      const json = await getIncomeHours(loggedInUser.id)
      console.log("jassasa");
      console.log(json);
      seti(json.income)
      seth(json.hours)
      };
      fetchData();




  }, []);

  return (
    // <View>

    // <Text>Activities (Chart)</Text>

    // <View>

    // <Text>{income} $</Text>
    // <Text>{hours} </Text>
    // </View>

    // </View>
<View style={styles.container}>
  {/* <Text style={styles.chartTitle}>Activities (Chart)</Text> */}
  <View style={styles.infoContainer}>
    <Text style={styles.incomeText}>{income} $</Text>
    <Text style={styles.hoursText}>{hours} Hours</Text>
  </View>
</View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    backgroundColor: '#F2F2F2',
    padding: 20,
    borderRadius: 10,
    // flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'left',
  },
  incomeText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'green',
    lineHeight: 50, // add this line
    marginBottom: 5,
  },
  hoursText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'blue',
    lineHeight: 50, // add this line
  },
});