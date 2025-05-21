import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB96bqJOx-X_SyHN0CiLpsJ5fW-3FanLGo',
  authDomain: 'bmbtournamets.firebaseapp.com',
  projectId: 'bmbtournamets',
  storageBucket: 'bmbtournamets.firebasestorage.app',
  messagingSenderId: '914211119810',
  appId: '1:914211119810:web:d2ef2e9a5de37fb9b7115b',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
