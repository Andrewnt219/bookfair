import { UserCredential } from 'firebase/auth';
import { atom } from 'jotai';

export const authUserAtom = atom<UserCredential['user'] | null>(null);
