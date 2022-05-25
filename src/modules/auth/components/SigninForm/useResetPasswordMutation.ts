import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { toastActions } from '../../../../stores';
import { getErrorMessage } from '../../../../utils';
import { AuthApi } from '../../api';
export const useResetPasswordMutation = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: AuthApi.resetPassword,
    onSuccess() {
      dispatch(
        toastActions.success({
          message: 'Reset password sent! Check your email',
        })
      );
    },
    onError(error) {
      dispatch(toastActions.error({ error }));
    },
  });
};
