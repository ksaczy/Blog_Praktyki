// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC72yOcmtlKZUrrYnOGCNwkv4Z_UejlJyM",
    authDomain: "praktyki-7f9f4.firebaseapp.com",
    projectId: "praktyki-7f9f4",
    storageBucket: "praktyki-7f9f4.firebasestorage.app",
    messagingSenderId: "378653654635",
    appId: "1:378653654635:web:4d8e1bea65c8508541bb2e",
    measurementId: "G-5VMFH7EC0H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)