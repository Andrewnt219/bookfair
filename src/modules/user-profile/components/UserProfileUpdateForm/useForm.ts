import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useRHF } from 'react-hook-form';
import { useAuthUserStore } from '../../../../stores';
import { UserProfileFormValues, userProfileSchema } from '../../types';

export const useForm = () => {
  const { authUser } = useAuthUserStore();

  return useRHF<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      displayName: authUser?.displayName ?? '',
    },
  });
};
