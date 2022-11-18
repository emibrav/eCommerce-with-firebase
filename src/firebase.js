// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpGf1Ely9YHm0YlpG844lYRjxw4S3HA6Q",
  authDomain: "react-movie-api-b8e1e.firebaseapp.com",
  projectId: "react-movie-api-b8e1e",
  storageBucket: "react-movie-api-b8e1e.appspot.com",
  messagingSenderId: "240515350736",
  appId: "1:240515350736:web:380112c4cd31bb39e21ed5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)