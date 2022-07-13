import z from 'zod';
export const displayNameSchema = z
  .string()
  .min(1, 'Display name is required')
  .refine((val) => !val.toLowerCase().includes('admin'), {
    message: "Display name cannot contain 'admin'",
  });
