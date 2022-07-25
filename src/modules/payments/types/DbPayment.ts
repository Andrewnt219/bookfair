import { z } from 'zod';
import { businessRules } from '../../../constants';
import { dbReadonlyItemSchema } from '../../../interfaces';

export const dbPaymentSchema = z
  .object({
    amount: z.number().nonnegative(),
    type: z.enum([
      businessRules.paymentTypes.PROMOTE_LISTING,
      businessRules.paymentTypes.PURCHASE_SLOT,
    ]),
  })
  .merge(dbReadonlyItemSchema);

export type DbPayment = z.infer<typeof dbPaymentSchema>;
