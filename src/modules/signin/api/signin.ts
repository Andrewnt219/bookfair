import { UserCredential } from 'firebase/auth';
import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';

import { axios } from '../../../lib/axios';
import { MutationConfig } from '../../../lib/react-query';
import {
  User_Signin_Body,
  User_Signin_Return,
} from '../../../pages/api/user/signin';
import { authUserActions } from '../../../stores';
import { getErrorMessage } from '../../../utils';

export const postSignin = async (
  body: User_Signin_Body
): Promise<UserCredential['user']> => {
  const res = await axios.post<User_Signin_Return>('/user/signin', body);
  return res.data.data;
};

type MutationFnType = typeof postSignin;

type UseSigninOptions = {
  config?: MutationConfig<MutationFnType>;
};

export const useSigninMutation = ({ config }: UseSigninOptions = {}) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  return useMutation({
    ...config,
    mutationFn: postSignin,
    onError: (error) => {
      enqueueSnackbar(getErrorMessage(error), { variant: 'error' });
    },
    onSuccess: (user) => {
      enqueueSnackbar('Logged in successfully', { variant: 'success' });
      dispatch(authUserActions.setAuthUser(user));
    },
  });
};
