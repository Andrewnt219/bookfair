import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthUserStore } from '../stores';

export const useAuthRoute = () => {
  const router = useRouter();
  const { authUser } = useAuthUserStore();

  if (authUser === null) {
    router.push('/signin');
  }
};
