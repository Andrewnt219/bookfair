import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { authUserActions, toastActions } from '../../../../stores';
import { getErrorMessage } from '../../../../utils';
import { AuthApi } from '../../api';

export const useSubmitMutation = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: AuthApi.signin,
    onError: (error) => {
      dispatch(toastActions.error({ error }));
    },
    onSuccess: (user) => {
      dispatch(authUserActions.setAuthUser(user));
      router.push('/');
      dispatch(
        toastActions.success({
          message: 'Login successfully',
        })
      );
    },
  });
};
