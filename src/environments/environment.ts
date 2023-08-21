/*export const environment = {
  production: true,
  apiUrl: 'http://localhost:4200',
};*/

// Import the functions you need from the SDKs you need

//import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
/*export const environment = {
  apiKey: "AIzaSyCPRNAhws4DCBYGPNrgQ9L7jwIIDDcxxCM",
  authDomain: "highkeystaff-register.firebaseapp.com",
  projectId: "highkeystaff-register",
  storageBucket: "highkeystaff-register.appspot.com",
  messagingSenderId: "490008510541",
  appId: "1:490008510541:web:231701ea69034f64a71c04"
};

// Initialize Firebase
const app = initializeApp(environment);

*/

// Jairo
export const environment = {
  apiUrl:'http://localhost:4200',
  production: true,
  testing: false,
  firebase:{
    apiKey: "AIzaSyCPRNAhws4DCBYGPNrgQ9L7jwIIDDcxxCM",
    authDomain: "highkeystaff-register.firebaseapp.com",
    //databaseURL: "https://highkeystaff.firebaseio.com",
    projectId: "highkeystaff-register",
    storageBucket: "highkeystaff-register.appspot.com",
    messagingSenderId: "490008510541",
    appId: "1:490008510541:web:231701ea69034f64a71c04"
  }
};

export const environment_A = {
  apiUrl:'http://localhost:4200',
  production: true,
  testing: false,
  firebase:{
    apiKey: "AIzaSyC6oGm9cwDuswR8Jf6vo6MNAZkrXoZ3wSY",
    //authDomain: "register.highkeystaff.com",
    authDomain: "highkeystaff.firebaseapp.com",
    databaseURL: "https://highkeystaff.firebaseio.com",
    projectId: "highkeystaff",
    storageBucket: "highkeystaff.appspot.com",
    messagingSenderId: "134573637500",
    appId: "1:134573637500:web:1f9fac07a4a32db4e36ef9"
  }
};