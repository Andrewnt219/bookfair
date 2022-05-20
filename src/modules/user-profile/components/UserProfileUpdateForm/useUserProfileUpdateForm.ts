import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { UserProfileFormValues, userProfileSchema } from '../../types';

export const useUserProfileUpdateForm = () =>
  useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      displayName: '',
    },
  });
