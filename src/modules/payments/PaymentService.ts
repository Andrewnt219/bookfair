import { Except } from 'type-fest';
import { db } from '../../lib/firebase-admin';
import { DbPayment } from './types';

export class PaymentService {
  static async createOne(data: DbPayment) {
    await db.payments.doc(data.id).set(data);
  }

  static async getOne(paymentId: string): Promise<DbPayment | undefined> {
    const ref = await db.payments.doc(paymentId).get();
    return ref.data();
  }

  static async updateOne(
    paymentId: string,
    data: Except<Partial<DbPayment>, 'id'>
  ) {
    await db.payments.doc(paymentId).update(data);
  }

  static async deleteOne(paymentId: string) {
    await db.payments.doc(paymentId).delete();
  }
}
