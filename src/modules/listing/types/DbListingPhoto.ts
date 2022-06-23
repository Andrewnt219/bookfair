import { z } from 'zod';
import { dbWriteableItemSchema } from '../../../interfaces';

export const dbListingPhotoSchema = z
  .object({
    listingId: z.string(),
    mediaUrl: z.string(),
  })
  .merge(dbWriteableItemSchema);

export type DbListingPhoto = z.infer<typeof dbListingPhotoSchema>;
