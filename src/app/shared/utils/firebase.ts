// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { environment } from "../../../environments/environment.development";
import { collection, getFirestore } from 'firebase/firestore';

// Initialize Firebase
export const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);

export const firestoreDB = getFirestore(app);

export const messageCollection = collection(firestoreDB, 'message');  
