import { TResult } from '@bookfair/common';
import { UserRecord } from 'firebase-admin/auth';
import {
  browserLocalPersistence,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { axios } from '../../../lib/axios';
import { firebaseAuth } from '../../../lib/firebase';
import {
  User_CreateOne_Return,
  User_CreateOne_Body,
} from '../../../pages/api/user/createOne';
import { SigninSchema } from '../types';

export class AuthApi {
  static resetPassword(email: string) {
    return sendPasswordResetEmail(firebaseAuth, email);
  }

  static async signin(body: SigninSchema): Promise<User> {
    await setPersistence(firebaseAuth, browserLocalPersistence);
    const credentials = await signInWithEmailAndPassword(
      firebaseAuth,
      body.email,
      body.password
    );
    return credentials.user;
  }

  static async signup(body: User_CreateOne_Body): Promise<TResult<UserRecord>> {
    const res = await axios.post<User_CreateOne_Return>(
      '/user/createOne',
      body
    );
    return res.data;
  }

  static async signout() {
    return signOut(firebaseAuth);
  }
}
