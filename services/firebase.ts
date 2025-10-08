
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBDM1P0WrLr5vFnUdVJGCfeLSyiOi-zvCs",
  authDomain: "okkes-app.firebaseapp.com",
  projectId: "okkes-app",
  storageBucket: "okkes-app.appspot.com",
  messagingSenderId: "1072253481907",
  appId: "1:1072253481907:web:436b4bbbb029f4e5f711c6",
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
