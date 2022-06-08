import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm as useRHF } from 'react-hook-form';
import { useAuthUserStore } from '../../../../stores';
import { useDbUserQuery } from '../../api';
import { UserProfileFormValues, userProfileSchema } from '../../types';

export const useForm = () => {
  const form = useRHF<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      displayName: '',
      bio: '',
    },
  });

  const { authUser } = useAuthUserStore();
  const dbUserQuery = useDbUserQuery(authUser?.uid);
  useEffect(
    function updateDisplayNameField() {
      if (dbUserQuery.data) {
        form.setValue('displayName', dbUserQuery.data.displayName);
        form.setValue('bio', dbUserQuery.data.bio);
      }
    },
    [dbUserQuery.data, form]
  );

  return form;
};
