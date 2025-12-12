import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAn2r0jQ0DcWxumhKcdRsArAihKY-JOAe0",
    authDomain: "braindrain-portal-v1.firebaseapp.com",
    projectId: "braindrain-portal-v1",
    storageBucket: "braindrain-portal-v1.firebasestorage.app",
    messagingSenderId: "79808669888",
    appId: "1:79808669888:web:1558b4351d4b2833576525"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
