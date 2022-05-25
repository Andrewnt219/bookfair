import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { toastActions } from '../../../../stores';
import { AuthApi } from '../../api';

export const useSubmitMutation = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: AuthApi.signup,
    onError: (error) => {
      dispatch(toastActions.error({ error }));
    },
    onSuccess: () => {
      dispatch(
        toastActions.success({
          message: 'Welcome to the market',
        })
      );
    },
  });
};
