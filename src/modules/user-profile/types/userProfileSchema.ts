import { z } from 'zod';
import { businessRules } from '../../../constants';
import { displayNameSchema } from '../../../schemas';

export const userProfileSchema = z.object({
  displayName: displayNameSchema,
  avatar: z
    .any()
    // Always has 1 file due to fatal superRefine
    .transform((files: FileList, ctx) => {
      const file = files?.[0];
      if (file && !businessRules.SUPPORTED_FORMATS.includes(file.type)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Supported format: ${businessRules.SUPPORTED_FORMATS.join(
            ', '
          )}`,
        });
      }

      if (file && file.size > businessRules.MAX_FILE_SIZE_BYTEs()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Max file size is ${businessRules.MAX_FILE_SIZE_MB}MB`,
        });
      }

      return file;
    }),
  bio: z.string(),
});
export type UserProfileFormValues = z.infer<typeof userProfileSchema>;
