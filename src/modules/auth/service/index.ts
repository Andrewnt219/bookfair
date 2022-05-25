import { adminAuth, db } from '../../../lib/firebase-admin';
import { DbUser } from '../../user-profile';

export class AuthService {
  static addUser(data: DbUser) {
    return db.users.doc(data.uid).set(data);
  }

  static updateUser(userId: string, data: Partial<DbUser>) {
    return db.users.doc(userId).update(data);
  }

  static getUser(userId: string) {
    return db.users.doc(userId).get();
  }

  static signupUser(data: { email: string; password: string }) {
    return adminAuth.createUser({ ...data, emailVerified: true });
  }
}
