import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCuvEWrr1xiiw8gGMBrlt462xBjlDIz6UA",
  authDomain: "inspired-bazaar-386316.firebaseapp.com",
  projectId: "inspired-bazaar-386316",
  storageBucket: "inspired-bazaar-386316.appspot.com",
  messagingSenderId: "483292893309",
  appId: "1:483292893309:web:dd1acc006b6183e5196114",
  measurementId: "G-CDHVJLY489"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

auth.languageCode = 'it';