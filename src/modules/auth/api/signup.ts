import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';

import { axios } from '../../../lib/axios';
import { MutationConfig } from '../../../lib/react-query';
import {
  User_CreateOne_Body,
  User_CreateOne_Return,
} from '../../../pages/api/user/createOne';
import { getErrorMessage } from '../../../utils';

export const postSignup = async (
  body: User_CreateOne_Body
): Promise<User_CreateOne_Return> => {
  const res = await axios.post<User_CreateOne_Return>('/user/createOne', body);
  return res.data;
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
