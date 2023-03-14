// Import the functions you need from the SDKs you need

import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { initializeApp } from 'firebase/app';
/*import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth/react-native'; */

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDZljkKGMEsj1OI0jkho-Eg6Rv5h-8tWHE',
  authDomain: 'tekkauthentication.firebaseapp.com',
  projectId: 'tekkauthentication',
  storageBucket: 'tekkauthentication.appspot.com',
  messagingSenderId: '289621286274',
  appId: '1:289621286274:web:fd2e1956ae499f8e00439b',
};

//const app = initializeApp(firebaseConfig);

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

export const auth = firebase.auth(app);

/*
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
}); */

// Initialize Firebase
