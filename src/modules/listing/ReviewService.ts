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
}
