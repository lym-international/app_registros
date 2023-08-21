// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/*
export const environment = {
  production: false,
  apiUrl: 'http://localhost:4200',
};*/

// Import the functions you need from the SDKs you need

//import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

/*const firebaseConfig = {
  apiKey: "AIzaSyCPRNAhws4DCBYGPNrgQ9L7jwIIDDcxxCM",
  authDomain: "highkeystaff-register.firebaseapp.com",
  projectId: "highkeystaff-register",
  storageBucket: "highkeystaff-register.appspot.com",
  messagingSenderId: "490008510541",
  appId: "1:490008510541:web:231701ea69034f64a71c04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

*/

export const environment = {
  apiUrl:'http://localhost:4200',
  production: false,
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
  production: false,
  firebase:{
      apiKey: "AIzaSyC6oGm9cwDuswR8Jf6vo6MNAZkrXoZ3wSY",
      authDomain: "highkeystaff.firebaseapp.com",
      databaseURL: "https://highkeystaff.firebaseio.com",
      projectId: "highkeystaff",
      storageBucket: "highkeystaff.appspot.com",
      messagingSenderId: "134573637500",
      appId: "1:134573637500:web:1f9fac07a4a32db4e36ef9"
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
