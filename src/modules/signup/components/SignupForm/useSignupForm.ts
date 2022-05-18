import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { signupSchema, SignupSchema } from '../../types';

export const useSignupForm = () => {
  return useForm<SignupSchema>({
    resolver: yupResolver(signupSchema),
    defaultValues: signupSchema.getDefault(),
  });
};
