import { db } from '../../lib/firebase-admin';
import { DbListing } from './types';

export class ListingService {
  static async createOne(data: DbListing): Promise<void> {
    await db.listings.doc(data.id).set(data);
  }

  static async updateOne(
    listingId: string,
    data: Partial<DbListing>
  ): Promise<void> {
    await db.listings.doc(listingId).update(data);
  }
}
