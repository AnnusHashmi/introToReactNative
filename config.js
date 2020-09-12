
// export const firebaseConfig = {
//     apiKey: "AIzaSyALZCtTrDvFxvBTT5aEcm9oJq890_H0x6Y",
//     authDomain: "tg-app-b6d0a.firebaseapp.com",
//     databaseURL: "https://tg-app-b6d0a.firebaseio.com",
//     projectId: "tg-app-b6d0a",
//     storageBucket: "tg-app-b6d0a.appspot.com",
//     messagingSenderId: "266691762359",
//     appId: "1:266691762359:web:e22e94ca08ac02a21b1532",
//     measurementId: "G-4RV2EVDFQ5"
//   };
import * as firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyALZCtTrDvFxvBTT5aEcm9oJq890_H0x6Y",
  authDomain: "tg-app-b6d0a.firebaseapp.com",
  databaseURL: "https://tg-app-b6d0a.firebaseio.com",
  projectId: "tg-app-b6d0a",
  storageBucket: "tg-app-b6d0a.appspot.com",
  messagingSenderId: "266691762359",
  appId: "1:266691762359:web:e22e94ca08ac02a21b1532",
  measurementId: "G-4RV2EVDFQ5"
};


firebase.initializeApp(firebaseConfig);
  // firebase.analytics();
  
// const db = firebase.firestore();
// const auth = firebase.auth();
export default firebase;
  // export {
  //   db,auth
  // }