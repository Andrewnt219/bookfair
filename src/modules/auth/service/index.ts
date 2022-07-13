import { Except } from 'type-fest';
import { adminAuth, adminStorage, db } from '../../../lib/firebase-admin';
import { DbUser } from '../../user-profile';
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

  static async getUser(userId: string): Promise<DbUser | null> {
    const ref = await db.users.doc(userId).get();
    return ref.data() ?? null;
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
}
