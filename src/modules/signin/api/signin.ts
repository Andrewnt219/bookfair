import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';

import { firebaseAuth } from '../../../lib/firebase';
import { MutationConfig } from '../../../lib/react-query';
import { authUserActions } from '../../../stores';
import { getErrorMessage } from '../../../utils';
import { SigninSchema } from '../types';

export const postSignin = async (
  body: SigninSchema
): Promise<UserCredential['user']> => {
  const credentials = await signInWithEmailAndPassword(
    firebaseAuth,
    body.email,
    body.password
  );
  return credentials.user;
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
