import { z } from 'zod';
import { badWords } from '../constants';

// NOTE: import this from './utils/index.ts' somehow webpack not working
export const noBadWord = <T extends z.ZodString>(schema: T) => {
  return schema.superRefine((val, ctx) => {
    const words = val.toLowerCase().split(' ');
    const badWord = words.find((word) => badWords.includes(word));
    if (badWord) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Bad word detected: ${badWord}`,
      });
    }
  });
};
