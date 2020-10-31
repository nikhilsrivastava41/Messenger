import firebase from 'firebase';
const firebaseApp  = firebase.initializeApp(
    {
        apiKey: "AIzaSyDvyRknsa73EEmVgAmm4cpE9zSwMfmSBOA",
        authDomain: "messenger-b7a84.firebaseapp.com",
        databaseURL: "https://messenger-b7a84.firebaseio.com",
        projectId: "messenger-b7a84",
        storageBucket: "messenger-b7a84.appspot.com",
        messagingSenderId: "139269867163",
        appId: "1:139269867163:web:6f9b2f8c1067c369afa83e"
    }
);
const db= firebaseApp.firestore();
export default db;
