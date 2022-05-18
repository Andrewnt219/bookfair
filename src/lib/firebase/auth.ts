import { getAuth } from 'firebase/auth';
import { app } from './app';

export const firebaseAuth = getAuth(app);
