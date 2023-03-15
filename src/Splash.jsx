import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react'

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/teklogo.png')} style={styles.logo} />
      {/* <Text style={styles.title}>Tekk</Text> */}
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    margin: 200,
   padding:200,
   width:400
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  
});
