
import React, { useState, useEffect,useContext } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import io from 'socket.io-client';
import { getMessages,getUserById, getCompletionsOpenAI } from '../../../services/api';
import { SOCKET_API, OPENAI_API_KEY } from '../../../services/api_config';
// import React, { useState, useEffect, } from 'react';
import AppContext from '../../../AppContext';
import Moment from 'moment';
// const connection_api = 'http://192.168.5.131:3000/connection';
// const message_api = 'http://192.168.5.131:3000/message';

// const socket_api = 'http://localhost:5001'

export const SubChat = ({ navigation, route }) => {
    const { loggedInUser, setLoggedInUser } = useContext(AppContext);
    const { propValue, p2, roomid } = route.params;

    const [tomessage, set_tomessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [sender, setSender] = useState("User");
    const [tech_id, setTech_id] = useState(loggedInUser.id);
    const [tech_name, settech] = useState("");
    const [emp_name, setemp] = useState("");
    //aii sugg
    const [lastMessage, setLastMessage] = useState(null);
    const [suggestedReplies, setSuggestedReplies] = useState(["hello","okay","thank you", "what's the pay"]);


    //   const [socket, setSocket] = useState(null);
    const socket = io.connect(SOCKET_API);

    const getSuggestedReplies = async (message) => {
        console.log("getSuggestedReplies()");
        // const prompt = `Given the message: "${message}", suggest a possible reply.`;
        // const completions = await openai.completions.create({
        //   engine: 'davinci',
        //   prompt,
        //   maxTokens: 64,
        //   n: 5,
        //   stop: ['\n'],
        // });

        // console.log("raaaaaaaaaaaaaaaaaaaaaaaaaaaa",completions);

        // const replies = completions.choices.map((c) => c.text.trim());

        try {
            
            const data = await getCompletionsOpenAI(null, {
                message: `What's the best reply to "${message}"?(give a max 4-word answer)`,
              })
        console.log("raaaaaaaaaaaaaaaaaaaaaaaaaaaa",data);

            const completions = data.choices.map((choice) => choice.text.trim());
            setSuggestedReplies(completions);
          } catch (error) {
            console.error(error);
          }
      };

    useEffect(() => {
        // if (lastMessage) {
        //     getSuggestedReplies(lastMessage);
        //   }
        //populate messages using database
        const see = async()=>{
        //     await fetch('http://localhost:5001/api/v1/messages')
        //   .then((resp) => resp.json())
        //   .then((json) => {
            

        //     // setData(json)
        //     setMessages(json)
        //     // setMessages(messages => [...messages, json[0]  ]);
        
        //     console.log("speciallllll===============================l");
        //     console.log(json);
        
        // })
        //   .catch((error) => console.error(error));
        const json = await getMessages(roomid)
        const tech_name = await getUserById(tech_id)
        const emp_name = await getUserById(p2)
        console.log("=========================");
        console.log(tech_name.name);
        settech(tech_name.name)
        setemp(emp_name.name)
        setMessages(json)
        setLastMessage(json[json.length-1].message);
        getSuggestedReplies(json[json.length-1].message);
        }
        see()




        // connectApi();
        joinRoom()

        socket.on('connection', () => {
            console.log('Connected to server!');
        });

        socket.on("receive_message", (data) => {
            console.log(`Received message from server: `);

            console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            console.log(data);
            console.log("msgsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            console.log(messages);


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

    // const connectApi = async () => {
    //     try {

    //         const response0 = await fetch(connection_api, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         });
    //         const data0 = await response0.json();
    //         console.log("init success");

    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    function joinRoom() {
        console.log("guy joining");
        socket.emit("join_room", roomid);
    }



    const handleSend = async () => {
        // set_tomessage('');
        const messageData = {
            room: roomid,
            sender: tech_id,
            sender_type:"technician", //or employer
            job: propValue,
            message: tomessage,
            id: Date.now(),
            room_id: roomid
        };
        try {

            await socket.emit("send_message", messageData);

            // setMessages(messages => [...messages, messageData]);

            console.log("special");
            console.log(messages);

            //populate

            set_tomessage('');
            setLastMessage(tomessage);
            // await getSuggestedReplies(lastMessage);
            await getSuggestedReplies(tomessage);



            //   setMessages(prevMessages => [...prevMessages, { id: Date.now(), message: data1.output.trim(), sender: "Chatgpt" }]);
        } catch (error) {
            console.error(error);
        }
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.message}>
                {/* <Text style={styles.sender} >{item.sender_id}</Text> */}
                <Text style={styles.sender}>{Moment(item.date).format('MMMM Do, YYYY,HH:mm A')}</Text>
                { item.docModel==="technician" ? <Text style={styles.sender} >{tech_name}</Text> : <Text style={styles.sender} >{emp_name}</Text>  }
                <Text>{item.message}</Text>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
            keyboardVerticalOffset={120} // adjust this value as needed
        >
            <View style={styles.container}>
                {/* <TextInput
                    placeholder="Tsaddsadsdsa..."
                    value={tech_id}
                    onChangeText={(text) => setTech_id(text)}
                /> */}
                {/* <Text style={{ textAlign: "center", padding: "3%" }}>Job Id: {propValue}</Text> */}
                <Text style={{ textAlign: "center", padding: "3%" }}>Employer: {p2}</Text>
                <Text style={{ textAlign: "center", padding: "3%" }}>Technician Currently logged in: {tech_id}</Text>
                <Text style={{ textAlign: "center", padding: "3%" }}>ROOM ID: {roomid}</Text>



                <FlatList
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />





                {/* <View style={styles.inputContainer}>
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
                </View> */}


                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={tomessage}
                        onChangeText={(text) => set_tomessage(text)}
                        placeholder="Type a message..."
                        multiline={true}
                    />
                    <Button title="Send" onPress={handleSend} />
                </View>
                {suggestedReplies.length > 0 && (
                    <View style={styles.suggestionList}>

<ScrollView horizontal showsHorizontalScrollIndicator={false}>


                        {suggestedReplies.map((reply) => (
                            <Text
                            style={styles.suggestion}
                            onPress={() => set_tomessage(reply)}
                            
                            >
                                {reply}
                            </Text>
                        ))}
                        </ScrollView>
                    </View>
                )}


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
    },
    suggestionList: {
            backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        // backgroundColor: "#f2f2f2",
        padding: 15,
        marginBottom: 10,
        position: "absolute",
        bottom: 50,
        left: 0,
        right: 0,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      },
      suggestion: {
        backgroundColor: "#e0e0e0",
        color: "#333",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        marginHorizontal: 5,
        marginVertical: 2,
      },
});

