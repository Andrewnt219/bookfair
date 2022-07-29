import { z } from 'zod';
import { dbWriteableItemSchema } from '../../../interfaces';

export const dbMessage = z
  .object({
    message: z.string(),
    senderId: z.string(),
    receiverId: z.string(),
  })
  .merge(dbWriteableItemSchema);

export type DbMessage = z.infer<typeof dbMessage>;
