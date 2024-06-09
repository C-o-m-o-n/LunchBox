// import { initializeApp } from 'firebase/app';
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";
// Import the functions you need from the SDKs you need
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth'; 
import {initializeApp} from 'firebase/app'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAKaQSrMVFoyatBWJwWr9E2ph0Ah_qhMEw",
  authDomain: "lunchbox-3ac50.firebaseapp.com",
  projectId: "lunchbox-3ac50",
  storageBucket: "lunchbox-3ac50.appspot.com",
  messagingSenderId: "849929265490",
  appId: "1:849929265490:web:037f8cf1e3ac4718db1a8b",
  measurementId: "G-3E13ZNVZRV"
};

// const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// export default app

let app;
if (!app){
    app=initializeApp(firebaseConfig);
}
const db=getFirestore(app)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export {auth,db}

