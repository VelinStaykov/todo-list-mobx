import firebase from 'firebase/app'
import 'firebase/firestore'
import ReduxSagaFirebase from 'redux-saga-firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDM4ZqTIIZ_eMzm3FIFDZ_rmY8Uxjz9G5g",
    authDomain: "to-do-list-67397.firebaseapp.com",
    databaseURL: "https://to-do-list-67397.firebaseio.com",
    projectId: "to-do-list-67397",
    storageBucket: "to-do-list-67397.appspot.com",
    messagingSenderId: "225902048387",
    appId: "1:225902048387:web:14f06d795dbb1b4ee0d7b6"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const database = firebaseApp.firestore();
const reduxSagaFirebase = new ReduxSagaFirebase(firebaseApp)

export default reduxSagaFirebase;