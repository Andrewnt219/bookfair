import { useQuery } from 'react-query';
import { firebaseAuth } from '../../../../lib/firebase';
import { useToastStore } from '../../../../stores';
import { UserProfileApi } from '../../api';

export const useUserAbsolutePhotoUrlQuery = () => {
  const toastStore = useToastStore();
  const { currentUser } = firebaseAuth;

  return useQuery({
    queryFn: () => UserProfileApi.getUserAbsolutePhotoUrl(),
    queryKey: 'user-photo-url',
    enabled: Boolean(currentUser),
    onError: (error) => {
      toastStore.error(error);
    },
  });
};
