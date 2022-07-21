import { axios } from '../../../lib/axios';
import { QueryConfig, useTypedQuery } from '../../../lib/react-query';
import { User_GetDeactivatedUsers } from '../../../pages/api/user/getDeactivatedUsers';
import { useAuthUserStore } from '../../../stores';

const getDeactivatedUsers = async () => {
  const { data } = await axios.get<User_GetDeactivatedUsers['return']>(
    '/user/getDeactivatedUsers'
  );
  return data.data.users;
};

export interface UseGetDeactivatedUsersOptions {
  config?: QueryConfig<typeof getDeactivatedUsers>;
}

export const useGetDeactivatedUsers = (
  props: UseGetDeactivatedUsersOptions = {}
) => {
  const { authUser } = useAuthUserStore();
  return useTypedQuery<typeof getDeactivatedUsers>({
    ...props.config,
    queryFn: () => getDeactivatedUsers(),
    enabled: Boolean(authUser),
    queryKey: ['users', { type: 'deActivated' }],
  });
};
