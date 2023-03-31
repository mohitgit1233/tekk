import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Moment from 'moment';
import { Box,Button, Center, FlatList, NativeBaseProvider, ScrollView } from 'native-base';
import AppContext from '../../../AppContext';
import { getOffersByTechId, getIncomeHours } from '../../../services/api';

export const Activities = ({ navigation }) => {
  const { loggedInUser, setLoggedInUser } = useContext(AppContext);
  const [income, setIncome] = useState(0);
  const [hours, setHours] = useState(0);
  const [showChart, setShowChart] = useState(false);
  const [jobStatus, setJobStatus] = useState('Year');
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
         <View style={styles.filterContainer}>
         <Button width={110} variant={jobStatus === 'Week' ? 'solid' : 'outline'} onPress={() => setJobStatus('Week')} mr={2} mb={2}
        style={jobStatus === 'Week' ?{ backgroundColor: '#0D937D'}:{ backgroundColor: '#F9F8F5' }}>
          <Text style={jobStatus === 'Week' ?{ color: '#F9F8F5', }: { color: '#0D937D', }}>
          This Week
        </Text></Button>
        <Button width={110} variant={jobStatus === 'Month' ? 'solid' : 'outline'} onPress={() => setJobStatus('Month')} mr={2} mb={2}
        style={jobStatus === 'Month' ?{ backgroundColor: '#0D937D'}:{ backgroundColor: '#F9F8F5' }}>
          <Text style={jobStatus === 'Month' ?{ color: '#F9F8F5', }: { color: '#0D937D', }}>
          This Month
        </Text></Button>
        <Button width={110}  variant={jobStatus === 'Year' ? 'solid' : 'outline'} onPress={() => setJobStatus('Year')} mr={2} mb={2}
        style={jobStatus === 'Year' ?{ backgroundColor: '#0D937D'}:{ backgroundColor: '#F9F8F5' }}>
          <Text style={jobStatus === 'Year' ?{ color: '#F9F8F5', }: { color: '#0D937D', }}>
          This Year
            </Text>
          </Button>
      </View>
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
backgroundColor: '#F9F8F5',
paddingHorizontal: 20,
paddingVertical: 10,
},
filterContainer: {
flexDirection: 'row',
justifyContent: 'space-between',
marginBottom: 20,
},
infoContainer: {
backgroundColor: '#FFFFFF',
borderRadius: 10,
padding: 20,
marginBottom: 20,
alignItems: 'center',
},
incomeText: {
color: '#0D937D',
fontSize: 30,
fontWeight: 'bold',
marginBottom: 10,
},
hoursText: {
color: '#0D937D',
fontSize: 30,
fontWeight: 'bold',
marginBottom: 10,
},
labelText: {
color: '#0D937D',
fontSize: 16,
fontWeight: 'bold',
},
chartContainer: {
backgroundColor: '#F9F8F5',
borderRadius: 10,
padding: 20,
alignItems: 'center',
},
chartTitle: {
fontSize: 18,
fontWeight: 'bold',
marginBottom: 10,
},
chartStyle: {
marginVertical: 8,
borderRadius: 16,
},
});
