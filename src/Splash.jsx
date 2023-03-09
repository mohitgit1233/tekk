import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react'

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/tekklogo.jpeg')} style={styles.logo} />
      <Text style={styles.title}>Your App Name</Text>
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
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
