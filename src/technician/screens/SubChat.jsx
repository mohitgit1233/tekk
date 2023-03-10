
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, KeyboardAvoidingView } from 'react-native';

const connection_api = 'http://192.168.5.131:3000/connection';
const message_api = 'http://192.168.5.131:3000/message';

export const SubChat = ({navigation, route }) => {
    const { propValue, p2 } = route.params;

  const [tomessage, set_tomessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState("User");

  const [tech_id,setTech_id] = useState("63f17ce257353e03afc8f124");  

  useEffect(() => {
    connectApi();
  }, []);

  const connectApi = async () => {
    try {

      const response0 = await fetch(connection_api,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data0 = await response0.json();
      console.log("init success");

    } catch (error) {
      console.error(error);
    }
  }

  const handleSend = async () => {
      set_tomessage('');

    setMessages(prevMessages => [...prevMessages, { id: Date.now(), message: tomessage, sender: sender }]);
    try {
      const response = await fetch(message_api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: tomessage }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Message sent successfully
      console.log('Message sent successfully!');

      // Clear the message input
      set_tomessage('');
      //set messages including chatgpt resp
      const data1 = await response.json();
      console.log(data1);
      // setMessages([...messages, { id: Date.now(), message: data1.output, sender: "Chatgpt" }])
      setMessages(prevMessages => [...prevMessages, { id: Date.now(), message: data1.output.trim(), sender: "Chatgpt" }]);
    } catch (error) {
      console.error(error);
    }
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.message}>
        <Text style={styles.sender} >{item.sender}</Text>
        <Text>{item.message}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior="padding"
    keyboardVerticalOffset={64} // adjust this value as needed
  >
    <View style={styles.container}>
      <Text style={{ textAlign: "center", padding: "10%" }}>Job Id: {propValue}</Text>
      <Text style={{ textAlign: "center", padding: "10%" }}>Employer: {p2}</Text>
      <Text style={{ textAlign: "center", padding: "10%" }}>Technician Currently logged in: {tech_id}</Text>


      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={tomessage}
          onChangeText={(text) => set_tomessage(text)}
          placeholder="Type a message..."
          multiline={true}
          // onSubmitEditing={handleSend}
        />
        <Button
          title="Send"
          onPress={handleSend}
        />
      </View>
    </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  message: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sender: {
    // backgroundColor: "red"
    color: "grey"
  }
});

