import { useMutation } from 'react-query';
import { useToastStore } from '../../../../stores';
import { AuthApi } from '../../api';
export const useResetPasswordMutation = () => {
  const toastStore = useToastStore();

  return useMutation({
    mutationFn: AuthApi.resetPassword,
    onSuccess() {
      toastStore.success('Reset password sent! Check your email');
    },
    onError(error) {
      toastStore.error(error);
    },
  });
};
