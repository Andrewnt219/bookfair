import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { app } from './app';

export const db = getFirestore(app);
