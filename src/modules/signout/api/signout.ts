import { signOut } from 'firebase/auth';
import { useSnackbar } from 'notistack';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';

import { firebaseAuth } from '../../../lib/firebase';
import { MutationConfig } from '../../../lib/react-query';
import { authUserActions } from '../../../stores';
import { getErrorMessage } from '../../../utils';

export const postSignout = async () => {
  await signOut(firebaseAuth);
};

type MutationFnType = typeof postSignout;

type UseSignoutOptions = {
  config?: MutationConfig<MutationFnType>;
};

export const useSignoutMutation = ({ config }: UseSignoutOptions = {}) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  return useMutation({
    ...config,
    mutationFn: postSignout,
    onError: (error) => {
      enqueueSnackbar(getErrorMessage(error), { variant: 'error' });
    },
    onSuccess: () => {
      enqueueSnackbar('Logged out successfully', { variant: 'success' });
      dispatch(authUserActions.unsetAuthUser());
    },
  });
};
