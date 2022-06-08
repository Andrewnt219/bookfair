import { UserProfileApi } from '..';
import { useTypedQuery } from '../../../lib/react-query';

type FnType = typeof UserProfileApi.getUserById;

export const useDbUserQuery = (uid: string | undefined) => {
  return useTypedQuery<FnType>({
    // Only run when exist
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => UserProfileApi.getUserById({ userId: uid! }),
    queryKey: 'user-profile',
    enabled: Boolean(uid),
  });
};
