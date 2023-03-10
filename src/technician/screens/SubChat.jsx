
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, KeyboardAvoidingView } from 'react-native';
import io from 'socket.io-client';


const connection_api = 'http://192.168.5.131:3000/connection';
const message_api = 'http://192.168.5.131:3000/message';
const socket_api = 'http://192.168.5.131:5001'

export const SubChat = ({ navigation, route }) => {
    const { propValue, p2 } = route.params;

    const [tomessage, set_tomessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [sender, setSender] = useState("User");

    const [tech_id, setTech_id] = useState("63f17ce257353e03afc8f124");

    //   const [socket, setSocket] = useState(null);
    const socket = io.connect(socket_api);


    useEffect(() => {
        // connectApi();
        joinRoom()

        socket.on('connection', () => {
            console.log('Connected to server!');
        });

        socket.on("receive_message", (data) => {
            console.log(`Received message from server: `);
            console.log(data);

            setMessages(messages => [...messages, data  ]);

            console.log("msg list");
            console.log(messages);

            //populate (auto in react)
            // update();
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server.');
        });

    }, []);

    const connectApi = async () => {
        try {

            const response0 = await fetch(connection_api, {
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

    function joinRoom() {
        console.log("guy joining");
        socket.emit("join_room", "321");
    }



    const handleSend = async () => {
        // set_tomessage('');
        const messageData = {
            room: "321",
            sender: tech_id,
            message: tomessage,
            id: Date.now()
        };
        try {

            await socket.emit("send_message", messageData);

            setMessages(messages => [...messages, messageData]);

            console.log("special");
            console.log(messages);

            //populate

            set_tomessage('');

            //   setMessages(prevMessages => [...prevMessages, { id: Date.now(), message: data1.output.trim(), sender: "Chatgpt" }]);
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
                {/* <TextInput
                    placeholder="Tsaddsadsdsa..."
                    value={tech_id}
                    onChangeText={(text) => setTech_id(text)}
                /> */}
                <Text style={{ textAlign: "center", padding: "3%" }}>Job Id: {propValue}</Text>
                <Text style={{ textAlign: "center", padding: "3%" }}>Employer: {p2}</Text>
                <Text style={{ textAlign: "center", padding: "3%" }}>Technician Currently logged in: {tech_id}</Text>


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

