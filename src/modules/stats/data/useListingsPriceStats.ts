import { axios } from '../../../lib/axios';
import { QueryConfig, useTypedQuery } from '../../../lib/react-query';
import { Stats_GetListingsPrice } from '../../../pages/api/stats/getListingsPrice';
import { useAuthUserStore } from '../../../stores';

const getListingsPriceStats = async (
  params: Stats_GetListingsPrice['input']
) => {
  const { data } = await axios.get<Stats_GetListingsPrice['return']>(
    '/stats/getListingsPrice',
    { params }
  );
  return data.data;
};

export interface UseListingsPriceStatsOptions {
  config?: QueryConfig<typeof getListingsPriceStats>;
  startDate: string;
  endDate: string;
}

export const useListingsPriceStats = (props: UseListingsPriceStatsOptions) => {
  const { authUser } = useAuthUserStore();
  return useTypedQuery<typeof getListingsPriceStats>({
    ...props.config,
    queryFn: () =>
      getListingsPriceStats({
        endDate: props.endDate,
        startDate: props.startDate,
      }),
    queryKey: ['stats-listings-price', props.startDate, props.endDate],
    enabled: Boolean(props.startDate && props.endDate && authUser),
  });
};
