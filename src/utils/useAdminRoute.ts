import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDbUserQuery } from '../modules/user-profile';
import { useAuthUserStore, useToastStore } from '../stores';

export const useAdminRoute = () => {
  const router = useRouter();
  const { authUser } = useAuthUserStore();
  const dbUserQuery = useDbUserQuery(authUser?.uid);

  if (authUser === null) {
    router.push('/signin');
    return;
  }

  if (dbUserQuery.data && dbUserQuery.data.role !== 'admin') {
    router.push('/signin');
    return;
  }
};
