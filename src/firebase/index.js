import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDi8PzxdGk8rVXlK051n2MSuXAH84v5vf8",
  authDomain: "favouritesonglistingapp.firebaseapp.com",
  projectId: "favouritesonglistingapp",
  storageBucket: "favouritesonglistingapp.appspot.com",
  messagingSenderId: "168578022199",
  appId: "1:168578022199:web:740505832c37bae8ad38b2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
