import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDZljkKGMEsj1OI0jkho-Eg6Rv5h-8tWHE',
  authDomain: 'tekkauthentication.firebaseapp.com',
  projectId: 'tekkauthentication',
  storageBucket: 'tekkauthentication.appspot.com',
  messagingSenderId: '289621286274',
  appId: '1:289621286274:web:fd2e1956ae499f8e00439b',
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

export const auth = firebase.auth(app);
