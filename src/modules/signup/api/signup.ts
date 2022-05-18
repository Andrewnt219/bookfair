import { useMutation } from 'react-query';

import { axios } from '../../../lib/axios';
import { MutationConfig } from '../../../lib/react-query';

import { SignupSchema } from '../types';

export const postSignup = async (signupSchema: SignupSchema): Promise<void> => {
  return await axios.post('/user/signup', signupSchema);
};

type MutationFnType = typeof postSignup;

type UseSignupOptions = {
  config?: MutationConfig<MutationFnType>;
};

export const useSignupMutation = ({ config }: UseSignupOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: postSignup,
  });
};
