import { useSnackbar } from 'notistack';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';

import { axios } from '../../../lib/axios';
import { MutationConfig } from '../../../lib/react-query';
import { authUserActions } from '../../../stores';
import { getErrorMessage } from '../../../utils';

export const postSignout = async () => {
  return await axios.post('/user/signout');
};

type MutationFnType = typeof postSignout;

type UseSignoutOptions = {
  config?: MutationConfig<MutationFnType>;
};

export const useSignoutMutation = ({ config }: UseSignoutOptions = {}) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    ...config,
    mutationFn: postSignout,
    onError: (error) => {
      enqueueSnackbar(getErrorMessage(error), { variant: 'error' });
    },
    onSuccess: () => {
      enqueueSnackbar('Logged in successfully', { variant: 'success' });
      dispatch(authUserActions.unsetAuthUser());
    },
  });
};
