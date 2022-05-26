import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm as useRHF } from 'react-hook-form';
import { useDbUserQuery } from '../../api';
import { UserProfileFormValues, userProfileSchema } from '../../types';

export const useForm = () => {
  const form = useRHF<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      displayName: '',
    },
  });

  const dbUserQuery = useDbUserQuery();
  useEffect(
    function updateDisplayNameField() {
      if (dbUserQuery.data) {
        console.log({ dbUser: dbUserQuery.data });
        form.setValue('displayName', dbUserQuery.data.displayName);
      }
    },
    [dbUserQuery.data, form]
  );

  return form;
};
