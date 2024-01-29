import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAe2GWINRURR43cOyUB_iaf3yw-s0lvRYg",
  authDomain: "comta-7c814.firebaseapp.com",
  projectId: "comta-7c814",
  storageBucket: "comta-7c814.appspot.com",
  messagingSenderId: "29241715473",
  appId: "1:29241715473:web:496d189805477032c6fab0"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);


export { db, firebaseApp, storage, ref, uploadBytes, getDownloadURL };