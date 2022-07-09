import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { firebaseAuth } from '../lib/firebase';
import { useAuthUserStore } from '../stores';

export const useAuthRoute = () => {
  const router = useRouter();
  const { authUser } = useAuthUserStore();

  useEffect(() => {
    if (authUser === null) {
      router.push('/signin');
    }
  }, [authUser, router]);
};
