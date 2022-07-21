import { z } from 'zod';
import { businessRules } from '../../../constants';
import { dbWriteableItemSchema } from '../../../interfaces';

// NOTE do NOT import this schema to server. Cause timeout for unknown reason
export const dbViolationSchema = z
  .object({
    listingId: z.string(),
    reporterId: z.string(),
    type: z.enum(businessRules.VIOLATION_TYPES),
    description: z.string(),
    adminId: z.string().optional(),
    resolvedAt: z.number().optional(),
    result: z.enum(businessRules.VIOLATION_RESULTS),
  })
  .merge(dbWriteableItemSchema);
export type DbViolation = z.infer<typeof dbViolationSchema>;
