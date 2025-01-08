// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import {getFirestore} from '@firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBX03x0wpH0I1FGbRVaT9A6j2MP4tiMNWM",
  authDomain: "animals-ecommerce.firebaseapp.com",
  projectId: "animals-ecommerce",
  storageBucket: "animals-ecommerce.firebasestorage.app",
  messagingSenderId: "301647195756",
  appId: "1:301647195756:web:f75e73857860b79cfaf249",
  measurementId: "G-4QVQVWZNVQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const firestire = getFirestore(app);