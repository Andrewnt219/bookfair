import { db } from '../../lib/firebase-admin';
import { DbAlert } from './types';

export class AlertService {
  static createOne(data: DbAlert) {
    return db.alerts.doc(data.id).set(data);
  }

  static async getOne(alertId: string): Promise<DbAlert | undefined> {
    const ref = await db.alerts.doc(alertId).get();
    return ref.data();
  }

  static async getByUserId(userId: string): Promise<DbAlert[]> {
    const queryRef = await db.alerts
      .where('userId', '==', userId)
      .where('isActive', '==', true)
      .get();
    return queryRef.docs.map((doc) => doc.data());
  }

  static async deleteOne(alertId: string) {
    return db.alerts.doc(alertId).update({ isActive: false });
  }
}
