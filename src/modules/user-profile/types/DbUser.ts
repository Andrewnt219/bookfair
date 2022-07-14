import z from 'zod';

export const dbUserSchema = z.object({
  role: z.union([z.literal('admin'), z.literal('user')]),
  displayName: z.string(),
  photoUrl: z.string().nullable().optional(),
  uid: z.string(),
  createdDate: z.number(),
  rating: z.number(),
  bio: z.string(),
  isActive: z.boolean(),
  listingLimit: z.number(),
  email: z.string().email(),
});

export type DbUser = z.infer<typeof dbUserSchema>;
