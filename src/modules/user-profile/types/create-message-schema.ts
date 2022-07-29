import { z } from 'zod';

export const createMessageSchema = z.object({
  text: z.string(),
});

export type CreateMessageSchema = z.infer<typeof createMessageSchema>;
