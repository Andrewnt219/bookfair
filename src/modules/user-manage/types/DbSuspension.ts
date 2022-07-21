import { z } from 'zod';
import { dbWriteableItemSchema } from '../../../interfaces';

export const dbSuspension = z
  .object({
    adminId: z.string(),
    reason: z
      .string()
      .min(10, { message: 'Reason must be at least 10 characters' }),
  })
  .merge(dbWriteableItemSchema);

export type DbSuspension = z.infer<typeof dbSuspension>;
