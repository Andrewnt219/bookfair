import * as yup from 'yup';
import { displayNameSchema } from '../../../schemas';

export const signupSchema = yup.object({
  email: yup
    .string()
    .email('Not a valid email')
    .required('Email is required')
    .default(''),
  password: yup.string().required('Password is required').default(''),
  retypePassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password does not match')
    .default(''),
  displayName: displayNameSchema.required('Display name is required'),
});

export type SignupSchema = yup.InferType<typeof signupSchema>;
