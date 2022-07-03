import { z } from 'zod';

export const searchListingSchema = z.object({
  search: z.string(),
});

export type SearchListingSchema = z.infer<typeof searchListingSchema>;
