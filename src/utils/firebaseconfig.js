
import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyApfBiErHTG_raSUWlleK57sVeiMMNY1iM",
    authDomain: "breastcancermodel.firebaseapp.com",
    projectId: "breastcancermodel",
    storageBucket: "breastcancermodel.appspot.com",
    messagingSenderId: "892641583634",
    appId: "1:892641583634:web:ec68a3b6b9b0ca281d2ecb"
  };
// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_APP_ID,
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)