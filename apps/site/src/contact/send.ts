import { toDocument, type ContactValues } from './message.ts';
import { CONTACT_COLLECTION, firebaseConfig } from './firebaseConfig.ts';

/** Stores a message in Firestore. Firebase loads only now, so the page itself stays light. */
export async function sendContact(values: ContactValues): Promise<void> {
  const [{ initializeApp, getApps }, { getFirestore, collection, addDoc, serverTimestamp }] =
    await Promise.all([import('firebase/app'), import('firebase/firestore/lite')]);
  const app = getApps()[0] ?? initializeApp(firebaseConfig);
  await addDoc(collection(getFirestore(app), CONTACT_COLLECTION), {
    ...toDocument(values),
    createdAt: serverTimestamp(),
  });
}
