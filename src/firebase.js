import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAemqMjzjsPxFgdTaJxrCXYuxnyMk-wpbg",
  authDomain: "instagram-clone-react-2645d.firebaseapp.com",
  projectId: "instagram-clone-react-2645d",
  storageBucket: "instagram-clone-react-2645d.appspot.com",
  messagingSenderId: "1097858984108",
  appId: "1:1097858984108:web:04b310b1c6ff0837d75709",
  measurementId: "G-7KP3XPKEM8",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};
