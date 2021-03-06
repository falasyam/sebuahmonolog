import Firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const FirebaseCredentials = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

if (!Firebase.apps.length) {
  Firebase.initializeApp(FirebaseCredentials);
}

// Firestore exports
export const auth = Firebase.auth();
export const firestore = Firebase.firestore();
export const serverTimestamp = Firebase.firestore.FieldValue.serverTimestamp;
export const fromMillis = Firebase.firestore.Timestamp.fromMillis;
export const increment = Firebase.firestore.FieldValue.increment;

// Storage exports
export const storage = Firebase.storage();
export const STATE_CHANGED = Firebase.storage.TaskEvent.STATE_CHANGED;

export default Firebase;

// Converts a firestore document to JSON
// @param {DocumentSnapshot} doc
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
