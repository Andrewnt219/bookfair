import { useMutation } from 'react-query';
import { AuthApi } from '../../api';
export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: AuthApi.resetPassword,
    onSuccess() {},
    onError(error) {},
  });
};
