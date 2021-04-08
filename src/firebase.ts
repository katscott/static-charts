import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyACvxGJL9Ug0qUDVHBqE055691fFncEJUc',
  authDomain: 'static-charts.firebaseapp.com',
  projectId: 'static-charts',
  storageBucket: 'static-charts.appspot.com',
  messagingSenderId: '842865870789',
  appId: '1:842865870789:web:9c95f120ec9f600af72dac',
};

let firebaseApp: firebase.app.App;

// Initialize Firebase
if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp(firebaseConfig);
}

export default firebaseApp;
