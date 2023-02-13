// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDz9VBVucKvDbi-9WrRumOWv-Ql6Pvvouc",
  authDomain: "francine-94efd.firebaseapp.com",
  projectId: "francine-94efd",
  storageBucket: "francine-94efd.appspot.com",
  messagingSenderId: "1023151825948",
  appId: "1:1023151825948:web:5767f498cff6ad153cabd9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);