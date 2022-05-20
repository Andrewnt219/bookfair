import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useRHF } from 'react-hook-form';
import { UserProfileFormValues, userProfileSchema } from '../../types';

export const useForm = () =>
  useRHF<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      displayName: '',
    },
  });
