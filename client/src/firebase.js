
  import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  apiKey: "AIzaSyApk3Sben-iB4Vn20q2bkAMKvw78wdolus",
  authDomain: "logical-sled-365703.firebaseapp.com",
  projectId: "logical-sled-365703",
  storageBucket: "logical-sled-365703.appspot.com",
  messagingSenderId: "968377700272",
  appId: "1:968377700272:web:864a1f01ff2912d375d075",
  measurementId: "G-NT9NCLKWWZ",
  
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);

export default app;
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
 export {auth, app, analytics};