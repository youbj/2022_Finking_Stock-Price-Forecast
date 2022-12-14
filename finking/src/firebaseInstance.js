import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6yPLQQG4uDtYZAphYZhPkB7NERq0OAg8",
  authDomain: "finking-ccd6d.firebaseapp.com",
  projectId: "finking-ccd6d",
  storageBucket: "finking-ccd6d.appspot.com",
  messagingSenderId: "330078662971",
  appId: "1:330078662971:web:470cd7e154683f726f871e",
  measurementId: "G-WVQRJPM9L7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authService = getAuth();
export const dbService = getFirestore();
export const storageService = getStorage(app);
