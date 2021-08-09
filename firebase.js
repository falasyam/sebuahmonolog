import Firebase from "firebase/app";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4NtqKx1xFScXCJmtyT50KBUeOzgbcF4w",
  authDomain: "webflsym.firebaseapp.com",
  databaseURL: "https://webflsym.firebaseio.com",
  projectId: "webflsym",
  storageBucket: "webflsym.appspot.com",
  messagingSenderId: "581356401216",
  appId: "1:581356401216:web:e032d997a60d7bba0be5a5",
  measurementId: "G-HHXPWGKXN5",
};

if (!Firebase.apps.length) {
  Firebase.initializeApp(FirebaseCredentials);
}

export default Firebase;
