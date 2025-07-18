// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAe1zwQ2S5Tqg70dNOtGMPEAX3ToFOqbg8",
  authDomain: "netflixgpt-67fe1.firebaseapp.com",
  projectId: "netflixgpt-67fe1",
  storageBucket: "netflixgpt-67fe1.firebasestorage.app",
  messagingSenderId: "1059569234032",
  appId: "1:1059569234032:web:6302bedfe5a7e47ded44b5",
  measurementId: "G-5N3XBRN8JG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
