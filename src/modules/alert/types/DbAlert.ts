import { z } from 'zod';
import { dbWriteableItemSchema } from '../../../interfaces';

// TODO add userId to prevent sending alerts to the same user
export const dbAlertSchema = z
  .object({
    search: z.string(),
    userId: z.string(),
    isActive: z.boolean(),
  })
  .merge(dbWriteableItemSchema);

export type DbAlert = z.infer<typeof dbAlertSchema>;
