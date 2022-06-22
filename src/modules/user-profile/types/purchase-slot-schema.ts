import { z } from 'zod';

export const purchaseSlotSchema = z.object({
  quantity: z
    .union([z.string(), z.number()])
    .transform((value) => +value)
    .refine((value) => !isNaN(value), { message: 'Unexpected number' })
    .refine((value) => value >= 0, {
      message: 'Quantity cannot be lower than 0',
    }),
});

export type PurchaseSlotSchema = z.infer<typeof purchaseSlotSchema>;
