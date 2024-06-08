import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    // your Firebase credentials go here
    apiKey: "AIzaSyCWgXbjApbAUREuL__HSY7BXei-Lub5UI8",
    authDomain: "mern-messenger-f2589.firebaseapp.com",
    projectId: "mern-messenger-f2589",
    storageBucket: "mern-messenger-f2589.appspot.com",
    messagingSenderId: "438685254480",
    appId: "1:438685254480:web:ef328a7a0cb20761a02255",
    measurementId: "G-RG1EJYXPD8"
})

const db = firebaseApp.firestore()

export default db