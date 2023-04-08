
import React, { useState, useEffect,useContext } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, KeyboardAvoidingView, ScrollView,Image, TouchableOpacity } from 'react-native';
import io from 'socket.io-client';
import { getMessages,getUserById, getCompletionsOpenAI, getJobById } from '../../services/api';
import { SOCKET_API } from '../../services/api_config';
import AppContext from '../../AppContext';
import { UserAuth } from '../context/AuthContext';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
export const SubChatClient = ({ navigation, route }) => {
    const { user } = UserAuth();
    const { propValue, p2, roomid, job_id } = route.params;

    const [tomessage, set_tomessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [sender, setSender] = useState("User");
    //actually client id 😉
    const [tech_id, setTech_id] = useState(user._id);
    const [tech_name, settech] = useState("");
    const [emp_name, setemp] = useState("");
    const [jobn, setjobn] = useState("");
    //aii sugg
    const [lastMessage, setLastMessage] = useState(null);
    const [suggestedReplies, setSuggestedReplies] = useState(["hello","okay","thank you", "what's the pay"]);


    //   const [socket, setSocket] = useState(null);
    const socket = io.connect(SOCKET_API);

    const getSuggestedReplies = async (message) => {
        console.log("getSuggestedReplies()");

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
        //populate messages using database
        const see = async()=>{

        const json = await getMessages(roomid)
        const emp_name = await getUserById(tech_id)
        const tech_name = await getUserById(p2)
        const jobi = await  getJobById(job_id)
        settech(tech_name)
        setemp(emp_name)
        setjobn(jobi)
        setMessages(json)
        setLastMessage(json[json.length-1]&& json[json.length-1].message);
        getSuggestedReplies(json[json.length-1]&&json[json.length-1].message);
        }
        see()



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

            //recieve bubble fix
            getSuggestedReplies(messages[messages.length-1]&&messages[messages.length-1].message);

            //populate (auto in react)
            // update();
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server.');
        });

    }, []);


    function joinRoom() {
        console.log("guy joining");
        socket.emit("join_room", roomid);
    }



    const handleSend = async () => {
        // set_tomessage('');
        const messageData = {
            room: roomid,
            sender: tech_id,
            sender_type:"employer", //or employer
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
            item.docModel==="employer" ?            ( <View style={styles.message2}>
                {/* <Text style={styles.sender} >{item.sender_id}</Text> */}
                <Text style={styles.sender}>{Moment(item.date).format('MMMM Do, YYYY,HH:mm A')}</Text>
               {/* <Text style={styles.sender} >{tech_name.name}</Text>  */}
                <Text>{item.message}</Text>
            </View>) :          (   <View style={styles.message1}>
            {/* <Text style={styles.sender} >{item.sender_id}</Text> */}
            <Text style={styles.sender}>{Moment(item.date).format('MMMM Do, YYYY,HH:mm A')}</Text>
           {/* <Text style={styles.sender} >{emp_name.name}</Text>  */}
            <Text>{item.message}</Text>
        </View>)  
        );
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
            keyboardVerticalOffset={120} // adjust this value as needed
        >
            <View style={styles.container}>
            <View style={styles.header}>
            <Image
              source={{ uri: "https://picsum.photos/200" }}
              style={styles.image}
            />
            <View style={styles.headerText}>
              <Text style={styles.roomId}>{jobn.title}</Text>
              <Text style={styles.employer}>Technician: {emp_name.name}</Text>
            </View>
          </View>



                <FlatList
                style={{marginBottom:50}}
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
           
<View style={styles.inputContainer}>
    <View style={styles.inputIconContainer}>
        <TouchableOpacity style={styles.inputIcon}>
            <Icon name="camera" size={20} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.inputIcon}>
            <Icon name="photo" size={20} color="#666" />
        </TouchableOpacity>
    </View>
    <TextInput
        style={styles.input}
        value={tomessage}
        onChangeText={(text) => set_tomessage(text)}
        placeholder="Type a message..."
        multiline={true}
    />
    <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <Text style={styles.sendButtonText}>Send</Text>
    </TouchableOpacity>
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
    // container: {
    //     flex: 1,
    //     backgroundColor: '#fff',
    //     padding: 10,
    // },
    container: {
      flex: 1,
      backgroundColor: "#F5F5F5",
      padding: 10,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      backgroundColor: "#FFFFFF",
      padding: 10,
      borderRadius: 10,
    },
    headerText: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 10,
    },
    roomId: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 5,
      alignItems: 'flex-start',
      alignSelf: 'flex-start'
    },
    employer: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 5,
      alignItems: 'flex-start',
      alignSelf: 'flex-start'
      
    },
    message1: {
        padding: 10,
        maxWidth: "70%",
        alignSelf: "flex-start",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        marginBottom: 5,
        borderTopLeftRadius: 2,
        backgroundColor: "#EBEBEB",
    },
    message2: {
          backgroundColor: "#DCF8C5",
        padding: 10,
        maxWidth: "70%",
        alignSelf: "flex-end",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        marginBottom: 5,
        borderTopRightRadius: 2,
      },
      sender: {
        fontSize: 12,
        color: "grey",
        marginTop: 5,
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
      // image: {
      //   width: 60,
      //   height: 60,
      //   borderRadius: 30,
      //   marginRight: 10,
      // },
      sendButton: {
        backgroundColor: "#0D937D",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
      },
      sendButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
      },
      inputIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
    },
    inputIcon: {
        marginHorizontal: 5,
    },
});

