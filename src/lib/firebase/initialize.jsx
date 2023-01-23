import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCMVqyGUUuAPBHNqrlQg1ZBdS83P9akx3w",
    authDomain: "project-vision-5d7ae.firebaseapp.com",
    projectId: "project-vision-5d7ae",
    storageBucket: "project-vision-5d7ae.appspot.com",
    messagingSenderId: "547705184695",
    appId: "1:547705184695:web:e728d7c999d6f806048832",
    measurementId: "G-K3YYL06GHJ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
