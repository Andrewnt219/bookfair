import { z } from 'zod';
import { dbWriteableItemSchema } from '../../../interfaces';
import { dbListingPhotoSchema } from './DbListingPhoto';

export const dbListingSchema = z
  .object({
    userId: z.string(),
    title: z.string(),
    price: z.number().nonnegative(),
    description: z.string(),
    isSold: z.boolean(),
    promote: z.string().nullable(),
    viewCount: z.number().nonnegative(),
    photos: z.array(dbListingPhotoSchema),
    isActive: z.boolean(),
  })
  .merge(dbWriteableItemSchema);

export type DbListing = z.infer<typeof dbListingSchema>;
