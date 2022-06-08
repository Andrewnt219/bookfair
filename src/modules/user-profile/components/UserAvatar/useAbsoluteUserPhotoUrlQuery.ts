import { useQuery } from 'react-query';
import { useAuthUserStore, useToastStore } from '../../../../stores';
import { useDbUserQuery, UserProfileApi } from '../../api';

export const useUserAbsolutePhotoUrlQuery = () => {
  const { authUser } = useAuthUserStore();
  const toastStore = useToastStore();
  const dbUserQuery = useDbUserQuery(authUser?.uid);
  const storageUrl = dbUserQuery.data?.photoUrl;

  return useQuery({
    // Only run when storageUrl exists
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => UserProfileApi.getUserAbsolutePhotoUrl(storageUrl!),
    queryKey: ['user-profile', 'user-avatar'],
    enabled: Boolean(storageUrl),
    onError: (error) => {
      toastStore.error(error);
    },
  });
};
