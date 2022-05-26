import z from 'zod';

export const dbUserSchema = z.object({
  displayName: z.string(),
  photoUrl: z.string().nullable().optional(),
  uid: z.string(),
  createdDate: z.date(),
});

export type DbUser = z.infer<typeof dbUserSchema>;
