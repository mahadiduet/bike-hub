import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAp0Q5Ddt9zWsNM4r_otAQo6WsOFE6DIxg",
  authDomain: "bikehub-36d8b.firebaseapp.com",
  projectId: "bikehub-36d8b",
  storageBucket: "bikehub-36d8b.appspot.com",
  messagingSenderId: "598506807605",
  appId: "1:598506807605:web:ea8a6360a4b8806b0f6c7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;