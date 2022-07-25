import { db } from '../../lib/firebase-admin';
import { DbListing } from './types';
import { Except } from 'type-fest';

export class ListingService {
  static async createOne(data: DbListing): Promise<void> {
    await db.listings.doc(data.id).set(data);
  }

  static async updateOne(
    listingId: string,
    data: Except<Partial<DbListing>, 'id'>
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

  static async deleteOne(listingId: string) {
    await db.listings.doc(listingId).update({ isActive: false });
  }

  static async getAll(): Promise<DbListing[]> {
    const queryRef = await db.listings.get();
    return queryRef.docs.map((doc) => doc.data());
  }

  static async getBetweenDate(startDate: number, endDate: number) {
    const queryRef = await db.listings
      .where('createdAt', '>=', startDate)
      .where('createdAt', '<=', endDate)
      .get();
    return queryRef.docs.map((doc) => doc.data());
  }

  static async getManyDeactivated(userId: string): Promise<DbListing[]> {
    const queryRef = await db.listings
      .where('isActive', '==', false)
      .where('isSold', '==', false)
      .where('userId', '==', userId)
      .get();
    return queryRef.docs.map((doc) => doc.data());
  }

  static async activateOne(listingId: string) {
    await db.listings.doc(listingId).update({ isActive: true });
  }

  static async getManyActivated(userId: string): Promise<DbListing[]> {
    const queryRef = await db.listings
      .where('isActive', '==', true)
      .where('isSold', '==', false)
      .where('userId', '==', userId)
      .get();
    return queryRef.docs.map((doc) => doc.data());
  }

  static async promoteOne(listingId: string, expiresAt: number) {
    await db.listings.doc(listingId).update({ promote: expiresAt });
  }
}
