// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

// // https://firebase.google.com/docs/web/setup#available-libraries
// console.log(import.meta.env.VITE_SOME_KEY)
// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_APIKEY,
//   authDomain: import.meta.env.VITE_AUTHDOMAIN,
//   projectId:import.meta.env.VITE_PROJECTID,
//   storageBucket: import.meta.env.VITE_STORAGEBUCKET,
//   messagingSenderId:import.meta.env.VITE_MESSAGINGSENDERID,
//   appId: import.meta.env.VITE_APPID
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export default app;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLO95ZL0AUlW7uhehngFVVFcqE7FeQlk8",
  authDomain: "fir-foodi-client-8e286.firebaseapp.com",
  projectId: "fir-foodi-client-8e286",
  storageBucket:"fir-foodi-client-8e286.appspot.com",
  messagingSenderId:"815546400330",
  appId:"1:815546400330:web:08ba22fc8ae3c76a28f0b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
