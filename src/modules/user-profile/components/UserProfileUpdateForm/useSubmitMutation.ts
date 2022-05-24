import { useMutation } from 'react-query';
import { getErrorMessage } from '../../../../utils';
import { UserProfileApi } from '../../api';

export const useSubmitMutation = () => {
  return useMutation({
    mutationFn: UserProfileApi.postAvatar,
    onSuccess: () => {},
    onError: (error) => {},
  });
};
