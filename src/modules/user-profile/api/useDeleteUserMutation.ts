import { useTypedMutation } from '../../../lib/react-query';
import { useToastStore } from '../../../stores';
import { useSignoutMutation } from '../components';
import { UserProfileApi } from './UserProfileApi';

type Fn = typeof UserProfileApi.deleteCurrentUser;
export const useDeleteUserMutation = () => {
  const toastStore = useToastStore();
  const signoutMutation = useSignoutMutation();

  return useTypedMutation<Fn>({
    mutationFn: UserProfileApi.deleteCurrentUser,
    onSuccess() {
      signoutMutation.mutate();
      toastStore.success('Account is deleted');
    },
    onError(error) {
      toastStore.error(error);
    },
  });
};
