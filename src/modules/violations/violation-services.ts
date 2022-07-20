import dayjs from 'dayjs';
import { db } from '../../lib/firebase-admin';
import { AuthService } from '../auth/service';
import { ListingService } from '../listing/ListingService';
import { DbViolation, ExpandedDbViolation } from './types';

export class ViolationService {
  static async createOne(violation: DbViolation) {
    return db.violations.doc(violation.id).set(violation);
  }

  static async getOne(violationId: string): Promise<DbViolation | undefined> {
    const queryRef = await db.violations.doc(violationId).get();
    return queryRef.data();
  }

  static async getExpanded(
    violationId: string
  ): Promise<ExpandedDbViolation | undefined> {
    const violation = await this.getOne(violationId);
    if (!violation) {
      return undefined;
    }

    const listing = await ListingService.getOne(violation.listingId);
    if (!listing) return undefined;
    const admin = violation.adminId
      ? await AuthService.getUser(violation.adminId)
      : undefined;
    const reporter = await AuthService.getUser(violation.reporterId);
    if (!reporter) return undefined;

    return {
      ...violation,
      listing,
      admin,
      reporter,
    };
  }
  static async getMany(): Promise<DbViolation[]> {
    const queryRef = await db.violations.get();
    return queryRef.docs.map((doc) => doc.data());
  }

  static async getManyUnresolved(): Promise<DbViolation[]> {
    const queryRef = await db.violations.where('result', '==', 'pending').get();
    return queryRef.docs.map((doc) => doc.data());
  }

  static async getManyResolved(): Promise<DbViolation[]> {
    const queryRef = await db.violations.where('result', '!=', 'pending').get();
    return queryRef.docs.map((doc) => doc.data());
  }

  static async getManyByListingId(listingId: string): Promise<DbViolation[]> {
    const queryRef = await db.violations
      .where('listingId', '==', listingId)
      .get();
    return queryRef.docs.map((doc) => doc.data());
  }

  static resolveOne(props: Pick<DbViolation, 'adminId' | 'id' | 'result'>) {
    return db.violations
      .doc(props.id)
      .update({ ...props, resolvedAt: dayjs().unix() });
  }
}
