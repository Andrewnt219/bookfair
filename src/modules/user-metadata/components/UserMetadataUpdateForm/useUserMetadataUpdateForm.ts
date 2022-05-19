import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { UserMetadataFormValues, userMetadataSchema } from '../../types';

export const useUserMetadataUpdateForm = () =>
  useForm<UserMetadataFormValues>({
    resolver: zodResolver(userMetadataSchema),
    defaultValues: {
      displayName: '',
    },
  });
