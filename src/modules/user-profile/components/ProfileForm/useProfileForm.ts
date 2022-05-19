import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { UserProfileSchema, userProfileSchema } from '../../types';

export const useProfileForm = () =>
  useForm<UserProfileSchema>({
    resolver: yupResolver(userProfileSchema),
    defaultValues: userProfileSchema.getDefault(),
  });
