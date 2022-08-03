import { FirebaseError } from 'firebase-admin';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useToastStore } from '../../../../stores';
import { AuthApi } from '../../api';
import { getSigninErrorMessage } from '../../utils';

export const useSubmitMutation = () => {
  const toastStore = useToastStore();
  const router = useRouter();

  return useMutation({
    mutationFn: AuthApi.signin,
    onError: (error) => {
      toastStore.error(getSigninErrorMessage(error as any));
    },
    onSuccess: () => {
      toastStore.success('Login successfully');
      router.push('/user/me');
    },
  });
};
