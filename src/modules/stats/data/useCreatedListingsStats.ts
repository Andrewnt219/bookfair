import { axios } from '../../../lib/axios';
import {
  MutationConfig,
  QueryConfig,
  useTypedMutation,
  useTypedQuery,
} from '../../../lib/react-query';
import { Stats_GetCreatedListings } from '../../../pages/api/stats/getCreatedListings';
import { useAuthUserStore } from '../../../stores';

const getCreatedListingsStats = async (
  params: Stats_GetCreatedListings['input']
) => {
  const { data } = await axios.get<Stats_GetCreatedListings['return']>(
    '/stats/getCreatedListings',
    {
      params,
    }
  );

  return data.data;
};

export interface UseCreatedListingsStatsOptions {
  config?: QueryConfig<typeof getCreatedListingsStats>;
  startDate: string;
  endDate: string;
}

export const useCreatedListingsStats = (
  props: UseCreatedListingsStatsOptions
) => {
  const { authUser } = useAuthUserStore();
  return useTypedQuery<typeof getCreatedListingsStats>({
    ...props.config,
    queryFn: () =>
      getCreatedListingsStats({
        endDate: props.endDate,
        startDate: props.startDate,
      }),
    queryKey: ['stats-created-listings', props.startDate, props.endDate],
    enabled: Boolean(props.startDate && props.endDate && authUser),
  });
};
