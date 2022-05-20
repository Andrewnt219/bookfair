import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useRHF } from 'react-hook-form';
import { signinSchema, SigninSchema } from '../../types';
export const useForm = () => {
  return useRHF<SigninSchema>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
};
