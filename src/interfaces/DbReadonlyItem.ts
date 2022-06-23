import { z } from 'zod';
import { dbItemSchema } from './DbItem';

export const dbReadonlyItemSchema = z
  .object({
    createdAt: z.string(),
  })
  .merge(dbItemSchema);

export type DbReadonlyItem = z.infer<typeof dbReadonlyItemSchema>;
