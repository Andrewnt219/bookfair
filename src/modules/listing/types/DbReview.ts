import { z } from 'zod';
import { dbWriteableItemSchema } from '../../../interfaces';

export const dbReviewSchema = z
  .object({
    title: z.string(),
    transactionId: z.string(),
    rating: z.number().positive(),
    body: z.string(),
  })
  .merge(dbWriteableItemSchema);

export type DbReview = z.infer<typeof dbReviewSchema>;
