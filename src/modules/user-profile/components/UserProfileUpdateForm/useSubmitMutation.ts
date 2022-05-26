import { useMutation, useQueryClient } from 'react-query';
import { firebaseAuth } from '../../../../lib/firebase';
import { useAuthUserStore, useToastStore } from '../../../../stores';
import { UserProfileApi } from '../../api';

export const useSubmitMutation = () => {
  const toastStore = useToastStore();
  const queryClient = useQueryClient();
  const authUserStore = useAuthUserStore();

  return useMutation({
    mutationFn: UserProfileApi.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries('user-profile');
      toastStore.success('Profile is updated successfully');
      if (firebaseAuth.currentUser) {
        authUserStore.setAuthUser(firebaseAuth.currentUser);
      }
    },
    onError: (error) => {
      toastStore.error(error);
    },
  });
};
