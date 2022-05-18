import * as yup from 'yup';

export const signinSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required')
    .default(''),
  password: yup.string().required('Password is required'),
});

export type SigninSchema = yup.InferType<typeof signinSchema>;
