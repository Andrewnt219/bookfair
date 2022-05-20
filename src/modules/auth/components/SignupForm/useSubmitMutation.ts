import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';
import { getErrorMessage } from '../../../../utils';
import { AuthApi } from '../../api';

export const useSubmitMutation = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: AuthApi.signup,
    onError: (error) => {
      enqueueSnackbar(getErrorMessage(error), { variant: 'error' });
    },
    onSuccess: () => {
      enqueueSnackbar('Success', { variant: 'success' });
    },
  });
};
