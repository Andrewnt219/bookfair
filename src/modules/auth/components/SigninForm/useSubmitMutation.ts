import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { authUserActions } from '../../../../stores';
import { getErrorMessage } from '../../../../utils';
import { AuthApi } from '../../api';

export const useSubmitMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: AuthApi.signin,
    onError: (error) => {
      enqueueSnackbar(getErrorMessage(error), { variant: 'error' });
    },
    onSuccess: (user) => {
      enqueueSnackbar('Logged in successfully', { variant: 'success' });
      dispatch(authUserActions.setAuthUser(user));
    },
  });
};
