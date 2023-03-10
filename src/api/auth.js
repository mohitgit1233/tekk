import { auth } from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const isLoggedIn = () => {
  return auth.currentUser;
};

const userLogOut = async () => {
  await AsyncStorage.clear();
  return auth.signOut();
};

export { isLoggedIn, userLogOut };
