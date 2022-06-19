import { FirestoreDataConverter, getFirestore } from 'firebase-admin/firestore';
import { DbListing } from '../../modules/listing';
import { DbPayment } from '../../modules/payments';
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
  listings: adminFirestore
    .collection('listings')
    .withConverter(createConverter<DbListing>()),
  payments: adminFirestore
    .collection('payments')
    .withConverter(createConverter<DbPayment>()),
};
