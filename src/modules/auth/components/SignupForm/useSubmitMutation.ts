import { useMutation } from 'react-query';
import { getErrorMessage } from '../../../../utils';
import { AuthApi } from '../../api';

export const useSubmitMutation = () => {
  return useMutation({
    mutationFn: AuthApi.signup,
    onError: (error) => {},
    onSuccess: () => {},
  });
};
