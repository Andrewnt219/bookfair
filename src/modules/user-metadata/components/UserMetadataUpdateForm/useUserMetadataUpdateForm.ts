import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { UserProfileSchema, userMetadataSchema } from '../../types';

export const useUserMetadataUpdateForm = () =>
  useForm<UserProfileSchema>({
    resolver: yupResolver(userMetadataSchema),
    defaultValues: userMetadataSchema.getDefault(),
  });
