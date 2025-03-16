// Import necessary Firebase modules for Firebase v9+
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBTeWblW5uuLueWTR_1h1XC6tXRn4i2sQI",
    authDomain: "esfam-attendance.firebaseapp.com",
    projectId: "esfam-attendance",
    storageBucket: "esfam-attendance.appspot.com",  // Fixed storageBucket URL
    messagingSenderId: "846910951812",
    appId: "1:846910951812:web:1ae305468ea1bfe3d0cdd1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore and Auth services
const db = getFirestore(app);
const auth = getAuth(app);

// You can now use db and auth in your application

