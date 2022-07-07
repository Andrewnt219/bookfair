import { z } from 'zod';
import { dbReadonlyItemSchema } from '../../../interfaces';

export const dbTransactionSchema = z
  .object({
    buyerId: z.string(),
    sellerId: z.string(),
    listingId: z.string(),
    isPending: z.boolean(),
    reviewId: z.string().optional(),
  })
  .merge(dbReadonlyItemSchema);

export type DbTransaction = z.infer<typeof dbTransactionSchema>;
