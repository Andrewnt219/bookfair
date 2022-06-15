import { useMutation, useQueryClient } from 'react-query';
import { useToastStore } from '../../../../stores';
import { UserProfileApi } from '../../api';

export const useSubmitMutation = () => {
  const toastStore = useToastStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UserProfileApi.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries('user-profile');
      toastStore.success('Profile is updated successfully');
    },
    onError: (error) => {
      toastStore.error(error);
    },
  });
};
