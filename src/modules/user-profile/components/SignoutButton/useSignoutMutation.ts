import { useMutation } from 'react-query';
import { useAuthUserStore, useToastStore } from '../../../../stores';
import { AuthApi } from '../../../auth';

export const useSignoutMutation = () => {
  const toastStore = useToastStore();
  const authUserStore = useAuthUserStore();

  return useMutation({
    mutationFn: AuthApi.signout,
    onSuccess() {
      toastStore.success('Signout successfully');
      authUserStore.unsetAuthUser();
    },
    onError(error) {
      toastStore.error(error);
    },
  });
};
