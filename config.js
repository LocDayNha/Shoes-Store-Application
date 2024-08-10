import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

export const firebaseConfig = {
    apiKey: "AIzaSyB-W92L6YnP85HvoS3pMvsEk3k3JQxgMiY",
    authDomain: "datn-f38f4.firebaseapp.com",
    projectId: "datn-f38f4",
    storageBucket: "datn-f38f4.appspot.com",
    messagingSenderId: "573778576377",
    appId: "1:573778576377:web:c8d6cd4703ffcd6b67f328",
    measurementId: "G-KSLXTERJJM"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}