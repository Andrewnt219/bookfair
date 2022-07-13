import { axios } from '../../../lib/axios';
import {
  MutationConfig,
  QueryConfig,
  useTypedMutation,
  useTypedQuery,
} from '../../../lib/react-query';
import { Stats_GetCreatedListings } from '../../../pages/api/stats/getCreatedListings';

const getCreatedListingsStats = async (
  body: Stats_GetCreatedListings['input']
) => {
  const { data } = await axios.post<Stats_GetCreatedListings['return']>(
    '/stats/getCreatedListings',
    body
  );

  return data.data;
};

export interface UseCreatedListingsStatsOptions {
  config?: MutationConfig<typeof getCreatedListingsStats>;
}

export const useCreatedListingsStats = (
  props: UseCreatedListingsStatsOptions = {}
) => {
  return useTypedMutation<typeof getCreatedListingsStats>({
    ...props.config,
    mutationFn: getCreatedListingsStats,
  });
};
