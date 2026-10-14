/**
 * The website's Firebase project (outcome-vault). These values identify the project; they are public by design and
 * grant nothing on their own: firestore.rules decides what anyone may do.
 */
export const firebaseConfig = {
  apiKey: 'AIzaSyD6I4XOuh6bi3vJU2XVVA8Hus1_dfSoAYY',
  authDomain: 'outcome-vault.firebaseapp.com',
  projectId: 'outcome-vault',
  storageBucket: 'outcome-vault.firebasestorage.app',
  messagingSenderId: '576141563640',
  appId: '1:576141563640:web:3fcccba937375429010d0d',
} as const;

/** Where messages go (firestore.rules allows creating them, nothing else). */
export const CONTACT_COLLECTION = 'contactMessages';
