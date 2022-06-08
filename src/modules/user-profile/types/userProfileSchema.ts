import { z } from 'zod';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTEs = MAX_FILE_SIZE_MB * 1024 * 1024;

export const userProfileSchema = z.object({
  displayName: z.string().min(1, { message: 'Display name cannot be empty' }),
  avatar: z
    .any()
    // Always has 1 file due to fatal superRefine
    .transform((files: FileList, ctx) => {
      const file = files?.[0];
      if (file && !SUPPORTED_FORMATS.includes(file.type)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Supported format: ${SUPPORTED_FORMATS.join(', ')}`,
        });
      }

      if (file && file.size > MAX_FILE_SIZE_BYTEs) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Max file size is ${MAX_FILE_SIZE_MB}MB`,
        });
      }

      return file;
    }),
  bio: z.string(),
});
export type UserProfileFormValues = z.infer<typeof userProfileSchema>;
