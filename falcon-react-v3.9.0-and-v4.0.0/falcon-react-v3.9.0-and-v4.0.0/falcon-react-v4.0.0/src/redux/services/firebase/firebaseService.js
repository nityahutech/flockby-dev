import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWDDxzY4dSRpF85l5TVImSmNVal74dRnE",
  authDomain: "nature-clubs-production.firebaseapp.com",
  databaseURL: "https://nature-clubs-production.firebaseio.com",
  projectId: "nature-clubs-production",
  storageBucket: "nature-clubs-production.appspot.com",
  messagingSenderId: "381292091048",
  appId: "1:381292091048:web:87da53004e062fa4d7d49d",
  measurementId: "G-ZLZG8TYZS5",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const authFireBase = firebase.auth;
export const firestoreDB = firebase.firestore();
