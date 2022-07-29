import z from 'zod';
import { noBadWord } from '../utils/zod-utils';
export const displayNameSchema = noBadWord(
  z.string().min(1, 'Display name is required')
).refine((val) => !val.toLowerCase().includes('admin'), {
  message: "Display name cannot contain 'admin'",
});
