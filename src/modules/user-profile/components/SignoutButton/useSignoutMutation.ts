import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useToastStore } from '../../../../stores';
import { AuthApi } from '../../../auth';

export const useSignoutMutation = () => {
  const toastStore = useToastStore();
  const router = useRouter();

  return useMutation({
    mutationFn: AuthApi.signout,
    onSuccess() {
      toastStore.success('Signout successfully');
      router.push('/');
    },
    onError(error) {
      toastStore.error(error);
    },
  });
};
