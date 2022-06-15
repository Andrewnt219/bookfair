import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useAuthUserStore, useToastStore } from '../../../../stores';
import { AuthApi } from '../../api';

export const useSubmitMutation = () => {
  const toastStore = useToastStore();
  const router = useRouter();

  return useMutation({
    mutationFn: AuthApi.signin,
    onError: (error) => {
      toastStore.error(error);
    },
    onSuccess: (user) => {
      toastStore.success('Login successfully');
      router.push('/');
    },
  });
};
