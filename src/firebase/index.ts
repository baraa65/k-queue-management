// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
import { ReactNativeFirebase } from '@react-native-firebase/app';
// import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
// import { initializeAppCheck } from 'firebase/app-check';
import { firebase } from '@react-native-firebase/app-check';
import { FirebaseApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';

let firebaseApp: ReactNativeFirebase.FirebaseApp | null = null;

export const firebaseConfig = {
  apiKey: 'AIzaSyBD2jBcFcNC_LVLeuxIRStJgH44NNZNqDs',
  authDomain: 'k-queue.firebaseapp.com',
  databaseURL: 'https://k-queue-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'k-queue',
  storageBucket: 'k-queue.appspot.com',
  messagingSenderId: '685966208533',
  appId: '1:685966208533:web:9c549e44884f78a918681c',
  measurementId: 'G-3SKYT92ZN0',
};

console.log('test123');
export async function createFirebaseApp() {
  console.log('test1111');
  console.log(firebaseApp);
  if (firebase.apps.length) return;

  firebaseApp = await firebase.initializeApp(firebaseConfig);
  initializeFirestore(firebase.app() as unknown as FirebaseApp, {
    experimentalForceLongPolling: true,
  });
  firebase.appCheck().activate('ignored', false);
}

// const firebaseApp = initializeApp(firebaseConfig);

// enableIndexedDbPersistence()

// export { firebaseApp };
