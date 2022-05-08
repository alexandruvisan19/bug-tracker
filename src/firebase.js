// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyB_YRuyT-PIE0uQBiO2XCE4Lm1PyAe39NA",
	authDomain: "test-eeec9.firebaseapp.com",
	projectId: "test-eeec9",
	storageBucket: "test-eeec9.appspot.com",
	messagingSenderId: "81954437066",
	appId: "1:81954437066:web:310043ecf656cfe53bc133",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
