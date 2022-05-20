import { z } from 'zod';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const MAX_FILE_SIZE_MB = 5;

export const userProfileSchema = z.object({
  displayName: z.string(),
  avatar: z
    .any()
    .superRefine((files: FileList | undefined, ctx) => {
      if (!files || files.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Avatar is required',
          fatal: true,
        });
      }
    })
    // Always has 1 file due to fatal superRefine
    .transform((files: FileList) => files[0]!)
    .refine((file) => SUPPORTED_FORMATS.includes(file.type), {
      message: `Supported format: ${SUPPORTED_FORMATS.join(', ')}`,
    })
    .refine((file) => file.size <= MAX_FILE_SIZE_MB * 1024 * 1024, {
      message: `Max file size is ${MAX_FILE_SIZE_MB}MB`,
    }),
});
export type UserProfileFormValues = z.infer<typeof userProfileSchema>;
