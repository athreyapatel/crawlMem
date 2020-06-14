const { parentPort } = require('worker_threads');
const admin = require('firebase-admin');
const dotenv = require('dotenv');

var serviceAccount = require('./seracc.json');

// var firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   databaseURL: process.env.DATABASE_URL,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.SENDER_ID,
//   appId: process.env.APPID,
//   measurementId: process.env.MEASURE_ID,
// };

// admin.initializeApp(firebaseConfig);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://crle-29ef9.firebaseio.com',
});
let db = admin.firestore();

let date = new Date();
let currentDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;

parentPort.once('message', (message) => {
  console.log('Received from main');

  db.collection('Rates')
    .doc(currentDate)
    .set({
      rates: JSON.stringify(message),
    })
    .then(() => {
      parentPort.postMessage('Save Success');
    })
    .catch((err) => console.log(err));
});
