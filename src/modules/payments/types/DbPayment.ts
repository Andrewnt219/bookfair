import { z } from 'zod';
import { dbReadonlyItemSchema } from '../../../interfaces';

export const dbPaymentSchema = z
  .object({
    amount: z.number().nonnegative(),
    type: z.enum(['listing/slot', 'listing/promote']),
  })
  .merge(dbReadonlyItemSchema);

export type DbPayment = z.infer<typeof dbPaymentSchema>;
