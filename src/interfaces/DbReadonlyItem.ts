import { z } from 'zod';
import { dbItemSchema } from './DbItem';

export const dbReadonlyItemSchema = z
  .object({
    createdAt: z.number(),
  })
  .merge(dbItemSchema);

export type DbReadonlyItem = z.infer<typeof dbReadonlyItemSchema>;
