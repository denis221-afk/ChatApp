import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App';
import './Styles/index.scss';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCKKjwjOcbLiWGctVrkUVpss5RYet6ynbk",
  authDomain: "chatapp-e55df.firebaseapp.com",
  databaseURL: "https://chatapp-e55df-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chatapp-e55df",
  storageBucket: "chatapp-e55df.appspot.com",
  messagingSenderId: "482823532928",
  appId: "1:482823532928:web:ae05949bdec708125bd165"
}

const firebase = initializeApp(firebaseConfig);




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


