import { z } from 'zod';
import { dbWriteableItemSchema } from '../../../interfaces';

export const dbReviewSchema = z
  .object({
    rating: z.number(),
    body: z.string(),
  })
  .merge(dbWriteableItemSchema);

export type DbReview = z.infer<typeof dbReviewSchema>;
