import {
  connectStorageEmulator,
  getDownloadURL,
  getStorage,
  ref,
} from 'firebase/storage';
import { app } from './app';

export const firebaseStorage = getStorage(app);
if (process.env.NEXT_PUBLIC_EMULATORS === 'on') {
  connectStorageEmulator(firebaseStorage, 'localhost', 9199);
}

export const toAbsoluteUrl = (storagePath: string) =>
  getDownloadURL(ref(firebaseStorage, storagePath));
