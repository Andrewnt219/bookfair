import { z } from 'zod';
import { dbListingSchema } from '../../listing';
import { dbUserSchema } from '../../user-profile';
import { dbViolationSchema } from './DbViolation';

export const expandedDbViolationSchema = dbViolationSchema
  .omit({
    adminId: true,
    listingId: true,
    reporterId: true,
  })
  .extend({
    admin: dbUserSchema.optional(),
    listing: dbListingSchema,
    reporter: dbUserSchema,
  });

export type ExpandedDbViolation = z.infer<typeof expandedDbViolationSchema>;
