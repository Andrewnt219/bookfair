import { Except } from 'type-fest';
import { HttpException } from '../../errors';
import { adminFirestore, db } from '../../lib/firebase-admin';
import { AuthService } from '../auth/service';
import { ListingService } from './ListingService';
import { ReviewService } from './ReviewService';
import { ExpandedDbTransaction } from './types';
import { DbTransaction } from './types/DbTransaction';

export class TransactionService {
  static async createOne(data: DbTransaction) {
    return db.transactions.doc(data.id).set(data);
  }

  static async getOne(id: string) {
    const ref = await db.transactions.doc(id).get();
    return ref.data();
  }

  static async updateOne(
    transactionId: string,
    data: Except<Partial<DbTransaction>, 'id'>
  ): Promise<void> {
    await db.transactions.doc(transactionId).update(data);
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

  static async getExpanded(
    transactionId: string,
    userId: string
  ): Promise<ExpandedDbTransaction> {
    const transaction = await this.getOne(transactionId);
    if (!transaction) throw new HttpException(404, 'Transaction not found');

    if (userId !== transaction.buyerId && userId !== transaction.sellerId)
      throw new HttpException(
        403,
        'You are not allowed to view this transaction'
      );

    const listing = await ListingService.getOne(transaction.listingId);
    if (!listing) throw new HttpException(404, 'Listing not found');

    const buyer = await AuthService.getUser(transaction.buyerId);
    const seller = await AuthService.getUser(listing.userId);
    if (!buyer || !seller)
      throw new HttpException(404, 'Buyer or seller not found');

    const review = transaction.reviewId
      ? await ReviewService.getOne(transaction.reviewId)
      : undefined;

    return {
      buyer,
      isPending: transaction.isPending,
      listing,
      seller,
      review,
      createdAt: transaction.createdAt,
      id: transaction.id,
    };
  }

  static async deleteMany(transactionIds: string[]) {
    const batch = adminFirestore.batch();
    for (const transactionId of transactionIds) {
      batch.delete(db.transactions.doc(transactionId));
    }
    await batch.commit();
  }
}
