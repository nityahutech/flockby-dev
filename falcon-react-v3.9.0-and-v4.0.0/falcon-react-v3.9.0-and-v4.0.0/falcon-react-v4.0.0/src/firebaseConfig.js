import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyDBPZCZOuaJldPPmlEfKoJZAEVHxMLWdpw',
  authDomain: 'fby-dev.firebaseapp.com',
  projectId: 'fby-dev',
  storageBucket: 'fby-dev.appspot.com',
  messagingSenderId: '617707689891',
  appId: '1:617707689891:web:ac0cf29c7aba2d5210ec16',
  measurementId: 'G-K4RQC4YGE6'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
