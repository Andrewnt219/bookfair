import { z } from 'zod';
import { dbSuspension } from './DbSuspension';

export const createSuspensionSchema = dbSuspension.pick({
  reason: true,
});

export type CreateSuspensionSchema = z.infer<typeof createSuspensionSchema>;
