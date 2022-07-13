import { z } from 'zod';
import { dbItemSchema } from './DbItem';

export const dbWriteableItemSchema = z
  .object({
    createdAt: z.number(),
    updatedAt: z.number(),
  })
  .merge(dbItemSchema);

export type DbWriteableItem = z.infer<typeof dbWriteableItemSchema>;
