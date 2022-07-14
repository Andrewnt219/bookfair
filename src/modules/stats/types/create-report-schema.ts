import dayjs from 'dayjs';
import { z } from 'zod';
import { businessRules } from '../../../constants';

export const createReportSchema = z
  .object({
    type: z.enum(businessRules.reportTypes),
    startDate: z
      .string()
      .refine((val) => dayjs(val).isValid(), { message: 'Invalid start date' }),
    endDate: z
      .string()
      .optional()
      .refine((val) => val && dayjs(val).isValid(), {
        message: 'Invalid end date',
      }),
  })
  .refine((data) => dayjs(data.startDate).isBefore(data.endDate), {
    message: 'Start date cannot be after end date',
    path: ['startDate'],
  });

export type CreateReportSchema = z.infer<typeof createReportSchema>;
