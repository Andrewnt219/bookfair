import { z } from 'zod';
import { createListingSchema } from './create-listing-schema';

export const updateListingSchema = createListingSchema.partial().merge(
  z.object({
    listingId: z.string().min(1, { message: 'listingId is required' }),
  })
);

export type UpdateListingSchema = z.infer<typeof updateListingSchema>;
