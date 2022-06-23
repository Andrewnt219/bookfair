import { z } from 'zod';
import { businessRules } from '../../../constants';

export const promoteListingSchema = z.object({
  days: z
    .enum(businessRules.promotionDays)
    .transform((val) => +val)
    .refine((val) => !isNaN(val), { message: 'Unexpected number format' })
    .refine((val) => val >= 0, {
      message: 'days cannot be negative',
    }),
  listingId: z.string(),
});

export type PromoteListingSchema = z.infer<typeof promoteListingSchema>;
