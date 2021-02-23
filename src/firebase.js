import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDh57DWCsfQjoEYjgBaYoVwz9O1_JOO2Do",
    authDomain: "hotel-booking-app-4cd5f.firebaseapp.com",
    projectId: "hotel-booking-app-4cd5f",
    storageBucket: "hotel-booking-app-4cd5f.appspot.com",
    messagingSenderId: "401731124553",
    appId: "1:401731124553:web:cc6b7cbe0cc749feb52e98",
    measurementId: "G-XS6GB96Y12"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
// const storage = firebase.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export { db, auth, timestamp };