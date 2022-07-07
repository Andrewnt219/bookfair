import { z } from 'zod';
import { dbUserSchema } from '../../user-profile';
import { dbListingSchema } from './DbListing';
import { dbReviewSchema } from './DbReview';
import { dbTransactionSchema } from './DbTransaction';

export const expandedDbTransactionSchema = z
  .object({
    buyer: dbUserSchema,
    seller: dbUserSchema,
    listing: dbListingSchema,
    review: dbReviewSchema.optional(),
  })
  .merge(
    dbTransactionSchema.omit({
      buyerId: true,
      sellerId: true,
      listingId: true,
      reviewId: true,
    })
  );
export type ExpandedDbTransaction = z.infer<typeof expandedDbTransactionSchema>;
