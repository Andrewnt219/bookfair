import { z } from 'zod';

export const createReviewSchema = z.object({
  transactionId: z.string(),
  body: z.string(),
  title: z.string(),
  rating: z.number().positive({ message: 'Rating is required' }),
});

export type CreateReviewSchema = z.infer<typeof createReviewSchema>;
