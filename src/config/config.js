import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBHhd8GvMGUiCVWE0VvlMYQs6zcV5ISY30",
  authDomain: "abdallahfirebasetask.firebaseapp.com",
  databaseURL: "https://abdallahfirebasetask-default-rtdb.firebaseio.com",
  projectId: "abdallahfirebasetask",
  storageBucket: "abdallahfirebasetask.appspot.com",
  messagingSenderId: "821044674895",
  appId: "1:821044674895:web:0603318d066af3ec70853a",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
