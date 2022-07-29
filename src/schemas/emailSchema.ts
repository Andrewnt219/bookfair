import z from 'zod';

export const emailSchema = z
  .string()
  .email('Invalid email format')
  .min(1, 'Email is required')
  .refine((email) => email.endsWith('myseneca.ca'), {
    message: 'Must be a @myseneca.ca email',
  });
