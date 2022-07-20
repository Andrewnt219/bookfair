import { z } from 'zod';
import { dbViolationSchema } from './DbViolation';

export const createViolationSchema = dbViolationSchema
  .pick({
    description: true,
    type: true,
  })
  .extend({
    isAccepted: z
      .boolean()
      .refine((val) => val === true, { message: 'Must be checked' }),
  });

export type CreateViolationSchema = z.infer<typeof createViolationSchema>;
