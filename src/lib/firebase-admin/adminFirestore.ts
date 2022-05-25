import { FirestoreDataConverter, getFirestore } from 'firebase-admin/firestore';
import { DbUser } from '../../modules/user-profile';
import { adminApp } from './adminApp';

export const adminFirestore = getFirestore(adminApp);

const createConverter = <T>(): FirestoreDataConverter<T> => ({
  fromFirestore: (snap) => snap.data() as T,
  toFirestore: (data) => data,
});

export const db = {
  users: adminFirestore
    .collection('users')
    .withConverter(createConverter<DbUser>()),
};
