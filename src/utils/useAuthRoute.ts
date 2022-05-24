import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthUserSlice } from '../stores';

export const useAuthRoute = () => {
  const { authUser } = useAuthUserSlice();
  const router = useRouter();

  useEffect(() => {
    if (!authUser) {
      router.push('/signin');
    }
  }, [authUser, router]);
};
