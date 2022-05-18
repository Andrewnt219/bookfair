import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';

import { axios } from '../../../lib/axios';
import { MutationConfig } from '../../../lib/react-query';
import { getErrorMessage } from '../../../utils';

import { SignupSchema } from '../types';

export const postSignup = async (signupSchema: SignupSchema): Promise<void> => {
  return await axios.post('/user/signup', signupSchema);
};

type MutationFnType = typeof postSignup;

type UseSignupOptions = {
  config?: MutationConfig<MutationFnType>;
};

export const useSignupMutation = ({ config }: UseSignupOptions = {}) => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    ...config,
    mutationFn: postSignup,
    onError: (error) => {
      enqueueSnackbar(getErrorMessage(error), { variant: 'error' });
    },
    onSuccess: () => {
      enqueueSnackbar('Success', { variant: 'success' });
    },
  });
};
