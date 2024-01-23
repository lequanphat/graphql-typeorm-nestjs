import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyAZnhPvi1g1-_Kc2Z_rAbANUvgKQ-J9lxk',
  authDomain: 'graphql-app-14182.firebaseapp.com',
  projectId: 'graphql-app-14182',
  storageBucket: 'graphql-app-14182.appspot.com',
  messagingSenderId: '578591605254',
  appId: '1:578591605254:web:f74cc1bc6acc1cc5893987',
  measurementId: 'G-8P14ENN7X4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
