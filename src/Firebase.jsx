import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_y0UOG3RdfLJ9mVqGDHB-q6UIIDNklJE",

  authDomain: "where-s-waldo-e2f5e.firebaseapp.com",

  projectId: "where-s-waldo-e2f5e",

  storageBucket: "where-s-waldo-e2f5e.appspot.com",

  messagingSenderId: "642786259491",

  appId: "1:642786259491:web:646abc7d78cd1aae6eb796"

};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
