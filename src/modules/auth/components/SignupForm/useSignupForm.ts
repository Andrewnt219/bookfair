import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signupSchema, SignupSchema } from '../../types';

export const useSignupForm = () => {
  return useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      retypePassword: '',
    },
  });
};
