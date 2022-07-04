import { z } from 'zod';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTEs = MAX_FILE_SIZE_MB * 1024 * 1024;

const validateFiles = (files: FileList): string[] => {
  const errors: Set<string> = new Set();

  for (const file of files) {
    if (!SUPPORTED_FORMATS.includes(file.type)) {
      errors.add(`Supported format: ${SUPPORTED_FORMATS.join(', ')}`);
    }

    if (file.size > MAX_FILE_SIZE_BYTEs) {
      errors.add(`Max file size is ${MAX_FILE_SIZE_MB}MB`);
    }
  }

  return Array.from(errors);
};

export const createListingSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  price: z
    .union([z.string(), z.number()])
    .transform((value) => +value)
    .refine((value) => !isNaN(value), { message: 'Unexpected number' })
    .refine((value) => value >= 0, { message: 'Price cannot be lower than 0' }),
  description: z
    .string()
    .min(20, { message: 'Description is at least 20 characters' }),
  tags: z.string(),
  course: z.string().min(1, { message: 'Course is required' }),
  photos: z.any().transform((files: FileList | null, ctx) => {
    if (!files) return null;

    for (const error of validateFiles(files)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: error,
      });
    }

    return files;
  }),
});

export type CreateListingSchema = z.infer<typeof createListingSchema>;
