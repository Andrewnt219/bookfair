import { z } from 'zod';
import { businessRules } from '../../../constants';
import { dbWriteableItemSchema } from '../../../interfaces';

export const violationType = z.enum(['accepted', 'rejected', 'pending']);
export type ViolationType = z.infer<typeof violationType>;
export const dbViolationSchema = z
  .object({
    listingId: z.string(),
    reporterId: z.string(),
    type: z.enum(businessRules.VIOLATION_TYPES),
    description: z.string(),
    adminId: z.string().optional(),
    resolvedAt: z.number().optional(),
    result: violationType,
  })
  .merge(dbWriteableItemSchema);
export type DbViolation = z.infer<typeof dbViolationSchema>;
