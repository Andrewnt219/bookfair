import { FirestoreDataConverter } from 'firebase-admin/firestore';
import { DbAlert } from '../../modules/alert';
import { DbListing, DbReview, DbTransaction } from '../../modules/listing';
import { DbPayment } from '../../modules/payments';
import { DbMessage, DbUser } from '../../modules/user-profile';
import { DbViolation } from '../../modules/violations';
import { adminFirestore } from './adminFirestore';

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
  alerts: adminFirestore
    .collection('alerts')
    .withConverter(createConverter<DbAlert>()),
  transactions: adminFirestore
    .collection('transactions')
    .withConverter(createConverter<DbTransaction>()),
  reviews: adminFirestore
    .collection('reviews')
    .withConverter(createConverter<DbReview>()),
  violations: adminFirestore
    .collection('violations')
    .withConverter(createConverter<DbViolation>()),
  message: adminFirestore
    .collection('messages')
    .withConverter(createConverter<DbMessage>()),
};
