import {FirebaseOptions, initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';


const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyB0mzAuvFO4aPL7MhOByiwu9iPww7nX8Ig",
    authDomain: "feed-the-cat-a1094.firebaseapp.com",
    databaseURL: "https://feed-the-cat-a1094-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "feed-the-cat-a1094",
    storageBucket: "feed-the-cat-a1094.appspot.com",
    messagingSenderId: "516213665565",
    appId: "1:516213665565:web:0b48890ffec004c0cffbf4"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);



export default {
    app,
    database,
    auth
}
