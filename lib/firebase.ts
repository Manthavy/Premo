import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyABPkDQGLvMNL5YiZBcT4KjXBb8xUJzI30",
  authDomain: "my-project-f739d.firebaseapp.com",
  projectId: "my-project-f739d",
  storageBucket: "my-project-f739d.appspot.com", // fixed typo: was "firebasestorage.app"
  messagingSenderId: "993887471257",
  appId: "1:993887471257:web:bc3fa98363a62a79099a08",
  measurementId: "G-5PWFBV7FPW",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);