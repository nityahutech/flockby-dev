import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};
//-------------------------
// const firebaseConfig = {
//   apiKey: 'AIzaSyD5BSytx1YhNo7A6p9W1hCPI6DeYTE6dV0',
//   authDomain: 'fby-dev.firebaseapp.com',
//   projectId: 'fby-dev',
//   storageBucket: 'fby-dev.appspot.com',
//   messagingSenderId: '617707689891',
//   appId: '1:617707689891:web:91a8d69664eacab410ec16',
//   measurementId: 'G-8JP5V9SJ0T'
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
