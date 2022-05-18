import * as yup from 'yup';

export const signupSchema = yup.object({
  email: yup.string().email().required().default(''),
  password: yup.string().required().default(''),
  confirm: yup.string().required().default(''),
});

export type SignupSchema = yup.InferType<typeof signupSchema>;
