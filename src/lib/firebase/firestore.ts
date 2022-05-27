import {
  connectFirestoreEmulator,
  getFirestore,
} from 'firebase/firestore/lite';
import { app } from './app';

export const firestore = getFirestore(app);
if (process.env.NEXT_PUBLIC_EMULATORS === 'on') {
  connectFirestoreEmulator(firestore, 'localhost', 8080);
}
