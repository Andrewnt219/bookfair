import { z } from 'zod';
import { dbWriteableItemSchema } from '../../../interfaces';
import { noBadWord } from '../../../utils/zod-utils';

export const dbReviewSchema = z
  .object({
    title: noBadWord(z.string()),
    transactionId: z.string(),
    rating: z.number().positive(),
    body: z.string(),
    listingId: z.string(),
    userId: z.string(),
    sellerId: z.string(),
  })
  .merge(dbWriteableItemSchema);

export type DbReview = z.infer<typeof dbReviewSchema>;
