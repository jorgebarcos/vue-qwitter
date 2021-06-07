import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4_WEjkJ3_yLfzlYl7OU3Zl7xsCIganNE",
  authDomain: "qwitter-1bfbe.firebaseapp.com",
  projectId: "qwitter-1bfbe",
  storageBucket: "qwitter-1bfbe.appspot.com",
  messagingSenderId: "674885377695",
  appId: "1:674885377695:web:83e5e70f54d6f0cc70ccaa"
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

export default db;
