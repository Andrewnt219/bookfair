import { axios } from '../../../lib/axios';
import { QueryConfig, useTypedQuery } from '../../../lib/react-query';
import { User_GetActivatedUsers } from '../../../pages/api/user/getActivatedUsers';
import { useAuthUserStore } from '../../../stores';

const getActivatedUsers = async () => {
  const { data } = await axios.get<User_GetActivatedUsers['return']>(
    '/user/getActivatedUsers'
  );
  return data.data.users;
};

export interface UseGetActivatedUsersOptions {
  config?: QueryConfig<typeof getActivatedUsers>;
}

export const useGetActivatedUsers = (
  props: UseGetActivatedUsersOptions = {}
) => {
  const { authUser } = useAuthUserStore();
  return useTypedQuery<typeof getActivatedUsers>({
    ...props.config,
    queryFn: () => getActivatedUsers(),
    enabled: Boolean(authUser),
    queryKey: ['users', { type: 'activated' }],
  });
};
