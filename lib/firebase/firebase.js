const firebase = require("firebase");
require("dotenv").config();

console.log(process.env.apiKey);

let db = {};

if (firebase.apps.length === 0) {
  const firebaseApp = firebase.initializeApp({
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId,
  });
  db = firebaseApp.firestore();
}

module.exports = db;
