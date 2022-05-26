import { useQuery } from 'react-query';
import { UserProfileApi } from '..';
import { useAuthUserStore } from '../../../stores/useAuthUserStore';

export const useDbUserQuery = () => {
  const { authUser } = useAuthUserStore();
  return useQuery({
    // Only run when there is authUser
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => UserProfileApi.getUserById({ userId: authUser!.uid }),
    queryKey: 'user-profile',
    enabled: Boolean(authUser),
  });
};
