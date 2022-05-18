import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { app } from './app';

export const firestore = getFirestore(app);
