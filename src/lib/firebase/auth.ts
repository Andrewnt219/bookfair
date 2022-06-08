import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { app } from './app';

export const firebaseAuth = getAuth(app);
if (process.env.NEXT_PUBLIC_EMULATORS === 'on') {
  connectAuthEmulator(firebaseAuth, `http://localhost:9099`, {
    disableWarnings: true,
  });
}
