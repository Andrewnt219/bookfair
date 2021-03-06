import { initializeApp, cert, getApps } from 'firebase-admin/app';
import serviceAccount from './serviceAccount';

const apps = getApps();
export const adminApp =
  apps.length === 0
    ? initializeApp({
        credential: cert(serviceAccount),
        storageBucket: 'bookfair-ba688.appspot.com',
      })
    : apps[0];
