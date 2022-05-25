import { getFirestore } from 'firebase-admin/firestore';
import { adminApp } from './adminApp';

export const adminFirestore = getFirestore(adminApp);
