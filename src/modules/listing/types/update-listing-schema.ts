import { z } from 'zod';
import { createListingSchema } from './create-listing-schema';

export const updateListingSchema = createListingSchema.partial();

export type UpdateListingSchema = z.infer<typeof updateListingSchema>;
