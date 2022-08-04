import { Except } from 'type-fest';
import { adminAuth, adminStorage, db } from '../../../lib/firebase-admin';
import { DbSuspension } from '../../user-manage';
import { DbDeactivatedUser, DbUser } from '../../user-profile';
import admin from 'firebase-admin';

export class AuthService {
  static addUser(data: DbUser) {
    return db.users.doc(data.uid).set(data);
  }

  static updateUser(
    userId: string,
    data: Except<Partial<DbUser>, 'uid' | 'role'>
  ) {
    return db.users.doc(userId).update(data);
  }

  static async getUser(userId: string): Promise<DbUser | undefined> {
    const ref = await db.users.doc(userId).get();
    return ref.data();
  }

  static signupUser(data: { email: string; password: string }) {
    return adminAuth.createUser({
      ...data,
      emailVerified: true,
    });
  }

  static async deleteUser(userId: string) {
    return Promise.all([
      adminAuth.deleteUser(userId),
      adminStorage.bucket().deleteFiles({
        prefix: `${userId}/`,
      }),
      db.users.doc(userId).update({
        bio: '',
        displayName: '',
        photoUrl: '',
        rating: 0,
        uid: '',
        isActive: false,
      }),
    ]);
  }

  static async getUsersBetweenDates(
    startDate: number,
    endDate: number
  ): Promise<DbUser[]> {
    const queryRef = await db.users
      .where('createdDate', '>=', startDate)
      .where('createdDate', '<=', endDate)
      .get();
    return queryRef.docs.map((doc) => doc.data());
  }

  static async deactivateUser(userId: string, suspension: DbSuspension) {
    await adminAuth.updateUser(userId, { disabled: true });
    return db.users.doc(userId).update({ suspension, isActive: false });
  }

  static async activateUser(userId: string) {
    await adminAuth.updateUser(userId, { disabled: false });
    return db.users.doc(userId).update({ suspension: null, isActive: true });
  }

  static async getActivatedUsers(): Promise<DbUser[]> {
    const queryRef = await db.users
      .where('role', '==', 'user')
      .where('suspension', '==', null)
      .get();
    return queryRef.docs.map((doc) => doc.data());
  }

  static async getDeactivatedUsers(): Promise<DbDeactivatedUser[]> {
    const queryRef = await db.users
      .where('role', '==', 'user')
      .where('suspension', '!=', null)
      .get();
    return queryRef.docs.map(
      (doc) => doc.data() as unknown as DbDeactivatedUser
    );
  }

  static async purchaseListing(userId: string, quantity: number) {
    await db.users.doc(userId).update({
      listingLimit: admin.firestore.FieldValue.increment(
        quantity
      ) as unknown as number,
    });
  }
}
