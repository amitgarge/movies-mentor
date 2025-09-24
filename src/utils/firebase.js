// src/utils/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCGnVAdymuIlBQhZH__qM5DgnmbYBgKLGw",
  authDomain: "movie-mentor-25faf.firebaseapp.com",
  projectId: "movie-mentor-25faf",
  storageBucket: "movie-mentor-25faf.firebasestorage.app",
  messagingSenderId: "183946222477",
  appId: "1:183946222477:web:686b376017aa72dc1cbbc4",
  measurementId: "G-2QWR7W4F7J",
};

const app = initializeApp(firebaseConfig);
let analytics;
isSupported().then((yes) => {
  if (yes) {
    analytics = getAnalytics(app);
  }
});
export const auth = getAuth(app);
