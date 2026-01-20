import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAJOjrkfzim3X-7r5vH4jRlFUMzIk032tw",
    authDomain: "nutraindia-1.firebaseapp.com",
    projectId: "nutraindia-1",
    storageBucket: "nutraindia-1.firebasestorage.app",
    messagingSenderId: "264226491154",
    appId: "1:264226491154:web:10fc9c80a9ea7df27c01cb",
    measurementId: "G-7HBL495FBS"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Enable offline persistence (don't wait for it)
enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
        console.log('Persistence failed: Multiple tabs open');
    } else if (err.code === 'unimplemented') {
        console.log('Persistence not available in this browser');
    }
});

// Load analytics lazily only when needed
export const getAnalyticsLazy = async () => {
    const { getAnalytics } = await import('firebase/analytics');
    return getAnalytics(app);
};
