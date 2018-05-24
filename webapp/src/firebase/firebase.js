import * as firebase from 'firebase';

const prodConfig = {
    apiKey: "AIzaSyDKONRGEna7vrSZvSfFJz3osOJ-xsf1Qmk",
    authDomain: "uberg-1523485227802.firebaseapp.com",
    databaseURL: "https://uberg-1523485227802.firebaseio.com",
    projectId: "uberg-1523485227802",
    storageBucket: "uberg-1523485227802.appspot.com",
    messagingSenderId: "272321176621"
};

const devConfig = {
    apiKey: "AIzaSyDKONRGEna7vrSZvSfFJz3osOJ-xsf1Qmk",
    authDomain: "uberg-1523485227802.firebaseapp.com",
    databaseURL: "https://uberg-1523485227802.firebaseio.com",
    projectId: "uberg-1523485227802",
    storageBucket: "uberg-1523485227802.appspot.com",
    messagingSenderId: "272321176621"
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.firestore();
const auth = firebase.auth();
const settings = {/* your settings... */ timestampsInSnapshots: true};
  db.settings(settings);

export {
    db,
  auth,
};
