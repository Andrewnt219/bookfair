import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useRHF } from 'react-hook-form';
import { signupSchema, SignupSchema } from '../../types';

export const useForm = () =>
  useRHF<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      retypePassword: '',
    },
  });
