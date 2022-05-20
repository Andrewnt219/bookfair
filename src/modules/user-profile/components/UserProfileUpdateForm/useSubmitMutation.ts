import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';
import { getErrorMessage } from '../../../../utils';
import { UserProfileApi } from '../../api';

export const useSubmitMutation = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: UserProfileApi.postAvatar,
    onSuccess: () => {
      enqueueSnackbar('Avatar is updated successfully', { variant: 'success' });
    },
    onError: (error) => {
      enqueueSnackbar(getErrorMessage(error), { variant: 'error' });
    },
  });
};
