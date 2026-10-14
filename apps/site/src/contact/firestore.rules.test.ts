import { readFileSync } from 'node:fs';
import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest';
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  type RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { CONTACT_COLLECTION } from './firebaseConfig.ts';
import { LIMITS } from './message.ts';

let env: RulesTestEnvironment;
const message = { name: 'Ana', email: 'ana@example.com', message: 'Hello' };

beforeAll(async () => {
  env = await initializeTestEnvironment({
    projectId: 'demo-ov',
    firestore: {
      rules: readFileSync(new URL('../../../../firestore.rules', import.meta.url), 'utf8'),
      host: '127.0.0.1',
      port: 8095,
    },
  });
});
beforeEach(() => env.clearFirestore());
afterAll(() => env.cleanup());

const visitor = () => collection(env.unauthenticatedContext().firestore(), CONTACT_COLLECTION);

describe('the contact rules', () => {
  it('let a visitor leave a message, with or without a company', async () => {
    await assertSucceeds(addDoc(visitor(), { ...message, createdAt: serverTimestamp() }));
    await assertSucceeds(addDoc(visitor(), { ...message, company: 'Acme', createdAt: serverTimestamp() }));
  });

  it('refuse missing fields, extra fields, a bad email or a made-up date', async () => {
    await assertFails(
      addDoc(visitor(), { name: 'Ana', email: 'ana@example.com', createdAt: serverTimestamp() }),
    );
    await assertFails(addDoc(visitor(), { ...message, admin: true, createdAt: serverTimestamp() }));
    await assertFails(addDoc(visitor(), { ...message, email: 'ana@', createdAt: serverTimestamp() }));
    await assertFails(addDoc(visitor(), { ...message, createdAt: new Date(2000, 0, 1) }));
  });

  it('enforce the same limits as the form', async () => {
    for (const field of ['name', 'message'] as const) {
      await assertSucceeds(
        addDoc(visitor(), { ...message, [field]: 'x'.repeat(LIMITS[field]), createdAt: serverTimestamp() }),
      );
      await assertFails(
        addDoc(visitor(), {
          ...message,
          [field]: 'x'.repeat(LIMITS[field] + 1),
          createdAt: serverTimestamp(),
        }),
      );
    }
    await assertFails(
      addDoc(visitor(), {
        ...message,
        company: 'x'.repeat(LIMITS.company + 1),
        createdAt: serverTimestamp(),
      }),
    );
  });

  it('never let anyone read, change or delete a message, nor touch anything else', async () => {
    await env.withSecurityRulesDisabled((context) =>
      setDoc(doc(context.firestore(), CONTACT_COLLECTION, 'one'), message),
    );
    const db = env.unauthenticatedContext().firestore();
    await assertFails(getDoc(doc(db, CONTACT_COLLECTION, 'one')));
    await assertFails(
      setDoc(doc(db, CONTACT_COLLECTION, 'one'), { ...message, createdAt: serverTimestamp() }),
    );
    await assertFails(setDoc(doc(db, 'anything', 'else'), { a: 1 }));
  });
});
