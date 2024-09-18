import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBw4Z2tEVXmDdC2Hm5roLJchtRNGHlytmk",
    authDomain: "healthcare-app-5c517.firebaseapp.com",
    projectId: "healthcare-app-5c517",
    storageBucket: "healthcare-app-5c517.appspot.com",
    messagingSenderId: "107890197237",
    appId: "1:107890197237:web:43a09fa6bc7eb5d4ccbbbc",
    measurementId: "G-8CL5W95SSP"
  };

  const app = initializeApp(firebaseConfig);

  // Initialize Firestore
  const firestore = getFirestore(app);
  
  export { firestore };