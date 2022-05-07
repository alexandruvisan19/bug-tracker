// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDwcAn_5DfLVTfuA9xwvng6pVqYquGb08A",
	authDomain: "pro-creek-315406.firebaseapp.com",
	projectId: "pro-creek-315406",
	storageBucket: "pro-creek-315406.appspot.com",
	messagingSenderId: "520983614414",
	appId: "1:520983614414:web:97a49f74e4106a25c1d19f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
