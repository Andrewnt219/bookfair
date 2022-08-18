import { z } from 'zod';
import { businessRules } from '../../../constants';

export const promoteListingSchema = z.object({
  days: z
    .string()
    .or(z.number())
    .transform((val) => +val)
    .refine((val) => !isNaN(val), { message: 'Unexpected number format' })
    .refine((val) => val >= 0, {
      message: 'days cannot be negative',
    })
    .refine(
      (val) => businessRules.promotionDays.includes(val.toString() as any),
      { message: `Must select ${businessRules.promotionDays.join(' | ')} day` }
    ),
  listingId: z.string(),
});

export type PromoteListingSchema = z.infer<typeof promoteListingSchema>;
