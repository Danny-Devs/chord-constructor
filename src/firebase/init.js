import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCimJOQ52EwnISy32sP6E9n6dYWKVB0al4",
  authDomain: "chordgame-36d67.firebaseapp.com",
  databaseURL: "https://chordgame-36d67.firebaseio.com",
  projectId: "chordgame-36d67",
  storageBucket: "chordgame-36d67.appspot.com",
  messagingSenderId: "629403585832",
  appId: "1:629403585832:web:34c56fed3410ad02"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// export firestore database
export default firebaseApp.firestore()