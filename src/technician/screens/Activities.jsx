import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Moment from 'moment';
import { Box, Center, FlatList, NativeBaseProvider, ScrollView } from 'native-base';
import AppContext from '../../../AppContext';
import { getOffersByTechId, getIncomeHours } from '../../../services/api';

export const Activities = ({ navigation }) => {
  const { loggedInUser, setLoggedInUser } = useContext(AppContext);
  const [income, setIncome] = useState(0);
  const [hours, setHours] = useState(0);
  const [showChart, setShowChart] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [chartTitle, setChartTitle] = useState('Income History');

  const handleIncomePress = () => {
    setShowChart(!showChart);
    setChartTitle('Income Generated');
  };

  const handleHoursPress = () => {
    setShowChart(!showChart);
    setChartTitle('Hours Worked');
  };

  useEffect(() => {
    const fetchData = async () => {
      const json = await getIncomeHours(loggedInUser.id);
      setIncome(json.income);
      setHours(json.hours/ 3600);
    };
    fetchData();

  //   const fetchChartData = async () => {
  //     const data = await getOffersByTechId(loggedInUser.id);
  //     const chartData = data.map((item) => ({
  //       date: Moment(item.date).format('MMM DD'),
  //       value: item.amount,
  //     }));
  //     setChartData(chartData);
  //   };
  //   fetchChartData();
  // }, []);
  const chartData = [
    { date: 'Jan 01', value: 100 },
    { date: 'Jan 02', value: 200 },
    { date: 'Jan 03', value: 150 },
    { date: 'Jan 04', value: 300 },
    { date: 'Jan 05', value: 250 },
    { date: 'Jan 06', value: 400 },
    { date: 'Jan 07', value: 350 },
  ];
  setChartData(chartData);
}, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleIncomePress}>
        <View style={styles.infoContainer}>
          <Text style={styles.incomeText}>{income.toFixed(2)} $</Text>
          <Text style={styles.labelText}>Income</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleHoursPress}>
        <View style={styles.infoContainer}>
          <Text style={styles.hoursText}>{hours.toFixed(2)} Hours</Text>
          <Text style={styles.labelText}>Hours Worked</Text>
        </View>
      </TouchableOpacity>
      {showChart && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>{chartTitle}</Text>
          <LineChart
            data={{
              labels: chartData.map((item) => item.date),
              datasets: [
                {
                  data: chartData.map((item) => item.value),
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  strokeWidth: 2,
                },
              ],
            }}
            width={350}
            height={220}
            yAxisSuffix="$"
            chartConfig={{
              backgroundColor: '#EAEAEA',
              backgroundGradientFrom: '#FFFFFF',
              backgroundGradientTo: '#FFFFFF',
              decimalPlaces: 3,
              color: (opacity = 2) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={styles.chartStyle}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white'
  },
  infoContainer: {
    backgroundColor: '#F2F2F2',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
    marginTop: 10,
  },
  incomeText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'green',
    lineHeight: 50,
    marginBottom: 5,
  },
  hoursText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'blue',
    lineHeight: 50,
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 10,
  },
  chartTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
