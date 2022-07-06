import { db } from '../../lib/firebase-admin';
import { DbTransaction } from './types/DbTransaction';

export class TransactionService {
  static async createOne(data: DbTransaction) {
    return db.transactions.doc(data.id).set(data);
  }

  static async getOne(id: string) {
    const ref = await db.transactions.doc(id).get();
    return ref.data();
  }

  static async getManyByBuyer(buyerId: string) {
    const query = await db.transactions.where('buyerId', '==', buyerId).get();
    return query.docs.map((doc) => doc.data());
  }

  static async getManyBySeller(sellerId: string) {
    const query = await db.transactions.where('sellerId', '==', sellerId).get();
    return query.docs.map((doc) => doc.data());
  }

  static async getManyByListing(listingId: string) {
    const query = await db.transactions
      .where('listingId', '==', listingId)
      .get();
    return query.docs.map((doc) => doc.data());
  }

  static async isBuyerExist(listingId: string, buyerId: string) {
    const query = await db.transactions
      .where('listingId', '==', listingId)
      .where('buyerId', '==', buyerId)
      .get();
    return query.docs.length > 0;
  }
}
