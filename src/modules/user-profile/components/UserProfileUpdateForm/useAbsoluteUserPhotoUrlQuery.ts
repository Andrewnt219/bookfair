import { useQuery } from 'react-query';
import { useToastStore } from '../../../../stores';
import { UserProfileApi } from '../../api';

export const useUserAbsolutePhotoUrlQuery = () => {
  const toastStore = useToastStore();

  return useQuery({
    queryFn: () => UserProfileApi.getUserAbsolutePhotoUrl(),
    queryKey: 'user-photo-url',
    onError: (error) => {
      toastStore.error(error);
    },
  });
};
