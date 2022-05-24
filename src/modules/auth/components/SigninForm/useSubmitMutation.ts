import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { authUserActions } from '../../../../stores';
import { AuthApi } from '../../api';

export const useSubmitMutation = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: AuthApi.signin,
    onError: (error) => {},
    onSuccess: (user) => {
      dispatch(authUserActions.setAuthUser(user));
    },
  });
};
