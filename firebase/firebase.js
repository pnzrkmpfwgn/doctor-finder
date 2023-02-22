// import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
// import {auth} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {initializeApp} from 'firebase/app';
import {getAuth, createUserWithEmailAndPassword,onAuthStateChanged,signOut,signInWithEmailAndPassword} from "firebase/auth";
import {useState,useEffect} from 'react';

// const app = initializeApp({
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_APP_ID
// })

const firebaseConfig = initializeApp({
    apiKey: "AIzaSyAfDDvm8qnWYYSnt8MFlJqt27AAwQfUVZ4",
    authDomain: "test-project-f1672.firebaseapp.com",
    projectId: "test-project-f1672",
    storageBucket: "test-project-f1672.appspot.com",
    messagingSenderId: "780359219292",
    appId: "1:780359219292:web:0144330a1a5a4985e2ce99"
})

const auth = getAuth(firebaseConfig)

export function signUp(email,password){
    return createUserWithEmailAndPassword(auth,email,password);
}

export function login(email,password){
    return signInWithEmailAndPassword(auth,email,password);
}

export function logOut(){
    return signOut(auth)
}

//Custom React Hook
export function useAuth(){
    const [currentUser, setCurrentUser] = useState();
    
    useEffect(()=>{
        const unSub = onAuthStateChanged(auth,user=> setCurrentUser(user));
        return unSub;
    },[])

    return currentUser;
}