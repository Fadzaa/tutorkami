// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyARloBQ4Hp4TdoF02WZko9QOvj3b3iNjA4",
    authDomain: "techom-fest-2025.firebaseapp.com",
    projectId: "techom-fest-2025",
    storageBucket: "techom-fest-2025.firebasestorage.app",
    messagingSenderId: "442336084539",
    appId: "1:442336084539:web:8f7c0fc6c2078bb4ff121e"
};

const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();

// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({
    prompt : "select_account "
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);