import z from 'zod';
import { noBadWord } from '../../../utils/zod-utils';

export const dbUserSchema = z.object({
  role: z.union([z.literal('admin'), z.literal('user')]),
  displayName: noBadWord(z.string()),
  photoUrl: z.string().nullable().optional(),
  uid: z.string(),
  createdDate: z.number(),
  bio: noBadWord(z.string()),
  isActive: z.boolean(),
  listingLimit: z.number(),
  email: z.string().email(),
  suspension: z.null(),
});

export type DbUser = z.infer<typeof dbUserSchema>;
