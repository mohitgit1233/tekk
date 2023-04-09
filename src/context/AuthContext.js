import { createContext, useContext, useEffect, useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

/*import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'; */
//import { auth } from '../firebase';
//import * as WebBrowser from 'expo-web-browser';
//import * as Google from 'expo-auth-session/providers/google';
//import AsyncStorage from '@react-native-async-storage/async-storage';

//WebBrowser.maybeCompleteAuthSession();

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [token, setToken] = useState('');
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
    webClientId:
      '1005924771215-17t1qcdengnfqikq7gaspbf72d88d9aq.apps.googleusercontent.com',
    iosClientId:
      '1005924771215-5jhg42c0tndnuvi15bod4h84jkh0p7cq.apps.googleusercontent.com',
    offlineAccess: true,
  });

  const onGoogleButtonPress = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  };

  // Handle user state changes
  /* function onAuthStateChanged(user) {
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);*/

  const signIn = async (email, password) => {
    return await auth().signInWithEmailAndPassword(email, password);
  };

  const createUser = async (email, password) => {
    return await auth().createUserWithEmailAndPassword(email, password);
  };

  const logout = async () => {
    return await auth()
      .signOut()
      .then(() => {
        setUser('');
      });
  };

  const [googleAuthentication, setgoogleAuthentication] = useState(false);

  /*
  const [request, response, promptAsync] = Google.useAuthRequest({
    responseType: 'id_token',
    // use offline access to get a refresh token and perform silent refresh in background
    androidClientId:
      '289621286274-5romp3io67ppa6nguuusb3b6fq25upif.apps.googleusercontent.com',
    iosClientId:
      '289621286274-pq5rnrb6l9crogmgg39rifmeh7ar70t6.apps.googleusercontent.com',
    expoClientId:
      '289621286274-3oa8fkftfdi17amo8c550bk0c98p5s8n.apps.googleusercontent.com',
  }); */

  /* useEffect(() => {
    if (response?.type === 'success') {
      setToken(response.params.id_token);
      setgoogleAuthentication(true);
      const persistAuth = async () => {
        /*await AsyncStorage.setItem(
          'token',
          JSON.stringify(response.params.id_token)
        );
      };
      persistAuth();
    }
  }, [response]); */

  /*const [user, setUser] = useState(null);

  const logout = async () => {
    return await signOut(auth).then(setUser(''));
  }; */

  /*useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []); */

  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        setUser,
        setgoogleAuthentication,
        logout,
        signIn,
        setToken,
        token,
        //promptAsync,
        googleAuthentication,
        onGoogleButtonPress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
