import { StyleSheet, Text, View } from 'react-native'
import React , {useContext} from 'react'
import { Button, FormControl, Label, Heading, HStack, Input, VStack } from 'native-base';
import AppContext from '../../AppContext';


const TechnicianProfile = ({ navigation }) => {
  const { loggedInUser, setLoggedInUser } = useContext(AppContext);

  return (
    <View>
      <Text>{loggedInUser.name}</Text>
      <Text>{loggedInUser.email}</Text>
      {/* <Text>TechnicianProfile</Text> */}
    </View>
  )
}

export default TechnicianProfile

const styles = StyleSheet.create({})