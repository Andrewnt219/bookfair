import { z } from 'zod';
import { dbItemSchema } from './DbItem';

export const dbWriteableItemSchema = z
  .object({
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .merge(dbItemSchema);

export type DbWriteableItem = z.infer<typeof dbWriteableItemSchema>;
