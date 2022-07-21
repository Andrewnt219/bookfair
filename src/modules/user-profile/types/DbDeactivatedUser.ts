import { z } from 'zod';
import { dbUserSchema } from './DbUser';
import { dbSuspension } from '../../user-manage';

export const dbDeactivatedUser = dbUserSchema
  .omit({ suspension: true })
  .extend({
    suspension: dbSuspension,
  });

export type DbDeactivatedUser = z.infer<typeof dbDeactivatedUser>;
