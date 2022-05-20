import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';
import { getErrorMessage } from '../../../../utils';
import { AuthApi } from '../../api';
export const useResetPasswordMutation = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: AuthApi.resetPassword,
    onSuccess() {
      enqueueSnackbar('Reset password sent! Check your email', {
        variant: 'success',
      });
    },
    onError(error) {
      enqueueSnackbar(getErrorMessage(error), { variant: 'error' });
    },
  });
};
