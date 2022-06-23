import { z } from 'zod';

export const dbItemSchema = z.object({
  id: z.string(),
});
export type DbItem = z.infer<typeof dbItemSchema>;
