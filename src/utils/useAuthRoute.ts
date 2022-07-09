import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { firebaseAuth } from '../lib/firebase';
import { useAuthUserStore } from '../stores';

export const useAuthRoute = () => {
  const router = useRouter();

  useEffect(() => {
    if (!firebaseAuth.currentUser) {
      router.push('/signin');
    }
  }, [router]);
};
