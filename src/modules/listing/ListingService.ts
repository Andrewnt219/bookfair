import { db } from '../../lib/firebase-admin';
import { DbListing, DbListingPhoto } from './types';

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

  static async getOne(listingId: string): Promise<DbListing | undefined> {
    const docRef = await db.listings.doc(listingId).get();
    return docRef.data();
  }

  static async getAllByUserId(userId: string): Promise<DbListing[]> {
    const queryRef = await db.listings.where('userId', '==', userId).get();
    return queryRef.docs.map((doc) => doc.data());
  }

  static async getPhotosByListingId(
    listingId: string
  ): Promise<DbListingPhoto[]> {
    const queryRef = await db.listingPhotos
      .where('listingId', '==', listingId)
      .get();
    return queryRef.docs.map((doc) => doc.data());
  }
}
