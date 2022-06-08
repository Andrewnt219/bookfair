import { useQuery } from 'react-query';
import { useToastStore } from '../../../../stores';
import { useDbUserQuery, UserProfileApi } from '../../api';

export const useUserAbsolutePhotoUrlQuery = (uid: string) => {
  const toastStore = useToastStore();
  const dbUserQuery = useDbUserQuery(uid);
  const storageUrl = dbUserQuery.data?.photoUrl;

  return useQuery({
    // Only run when storageUrl exists
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => UserProfileApi.getUserAbsolutePhotoUrl(storageUrl!),
    queryKey: ['user-profile', 'user-avatar', uid],
    enabled: Boolean(storageUrl),
    onError: (error) => {
      toastStore.error(error);
    },
  });
};
