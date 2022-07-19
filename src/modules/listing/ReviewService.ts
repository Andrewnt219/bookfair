import { db } from '../../lib/firebase-admin';
import { DbReview } from './types';

export class ReviewService {
  static async getOne(reviewId: string) {
    const ref = await db.reviews.doc(reviewId).get();
    return ref.data();
  }

  static async createOne(data: DbReview) {
    return db.reviews.doc(data.id).set(data);
  }

  static async getByListing(listingId: string): Promise<DbReview | undefined> {
    const ref = await db.reviews.where('listingId', '==', listingId).get();
    return ref.docs[0]?.data();
  }

  static async getByUserId(userId: string): Promise<DbReview[]> {
    const queryRef = await db.reviews.where('userId', '==', userId).get();
    return queryRef.docs.map((doc) => doc.data());
  }

  static async getBySellerId(sellerId: string): Promise<DbReview[]> {
    const queryRef = await db.reviews.where('sellerId', '==', sellerId).get();
    return queryRef.docs.map((doc) => doc.data());
  }
}
