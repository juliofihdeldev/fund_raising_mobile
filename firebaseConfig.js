import {initializeApp} from 'firebase/app';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAwP7gx3L5GvJrCUS-IO6DwvtpP_CsayLI',
  authDomain: 'pote-kole.firebaseapp.com',
  projectId: 'pote-kole',
  storageBucket: 'pote-kole.appspot.com',
  messagingSenderId: '1007886381659',
  appId: '1:1007886381659:web:365729b902a192dc5a857e',
  measurementId: 'G-8WXKYZPBWB',
};

const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app);
const auth = getAuth(app);

export {db, app, auth};
