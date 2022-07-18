import { axios } from '../../../lib/axios';
import { QueryConfig, useTypedQuery } from '../../../lib/react-query';
import { Stats_GetCreatedUsers } from '../../../pages/api/stats/getCreatedUsers';
import { useAuthUserStore } from '../../../stores';

const getCreatedUsersStats = async (params: Stats_GetCreatedUsers['input']) => {
  const { data } = await axios.get<Stats_GetCreatedUsers['return']>(
    '/stats/getCreatedUsers',
    { params }
  );
  return data.data;
};

export interface UseCreatedUsersStatsOptions {
  config?: QueryConfig<typeof getCreatedUsersStats>;
  startDate: string;
  endDate: string;
}

export const useCreatedUsersStats = (props: UseCreatedUsersStatsOptions) => {
  const { authUser } = useAuthUserStore();
  return useTypedQuery<typeof getCreatedUsersStats>({
    ...props.config,
    queryFn: () =>
      getCreatedUsersStats({
        endDate: props.endDate,
        startDate: props.startDate,
      }),
    queryKey: ['stats-created-users', props.startDate, props.endDate],
    enabled: Boolean(props.startDate && props.endDate && authUser),
  });
};
