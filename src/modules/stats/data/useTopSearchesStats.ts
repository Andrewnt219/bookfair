import { axios } from '../../../lib/axios';
import { QueryConfig, useTypedQuery } from '../../../lib/react-query';
import { Stats_GetTopSearches } from '../../../pages/api/stats/getTopSearches';
import { useAuthUserStore } from '../../../stores';

const getTopSearchStats = async (params: Stats_GetTopSearches['input']) => {
  const { data } = await axios.get<Stats_GetTopSearches['return']>(
    '/stats/getTopSearches',
    { params }
  );
  return data.data;
};

export interface UseTopSearchesStatsOptions {
  config?: QueryConfig<typeof getTopSearchStats>;
  startDate: string;
  endDate: string;
}

export const useTopSearchesStats = (props: UseTopSearchesStatsOptions) => {
  const { authUser } = useAuthUserStore();
  return useTypedQuery<typeof getTopSearchStats>({
    ...props.config,
    queryFn: () =>
      getTopSearchStats({
        endDate: props.endDate,
        startDate: props.startDate,
      }),
    queryKey: ['stats-top-search', props.startDate, props.endDate],
    enabled: Boolean(props.startDate && props.endDate && authUser),
  });
};
