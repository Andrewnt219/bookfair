import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { toastActions } from '../../../../stores';
import { getErrorMessage } from '../../../../utils';
import { UserProfileApi } from '../../api';

export const useSubmitMutation = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: UserProfileApi.postAvatar,
    onSuccess: () => {
      dispatch(
        toastActions.enqueue({
          message: 'Profile is updated successfully',
          variant: 'success',
        })
      );
    },
    onError: (error) => {
      dispatch(
        toastActions.enqueue({
          message: getErrorMessage(error),
          variant: 'danger',
        })
      );
    },
  });
};
