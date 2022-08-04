import { axios } from '../../../lib/axios';
import { QueryConfig, useTypedQuery } from '../../../lib/react-query';
import { Listing_GetTransactions } from '../../../pages/api/listing/getTransactions';
import { useAuthUserStore } from '../../../stores';

const getTransactions = async (params: Listing_GetTransactions['input']) => {
  const { data } = await axios.get<Listing_GetTransactions['return']>(
    '/listing/getTransactions',
    { params }
  );
  return data.data.transactions;
};

export interface UseGetTransactionsOptions {
  config?: QueryConfig<typeof getTransactions>;
  params: Listing_GetTransactions['input'];
}

export const useGetTransactions = ({
  config,
  params,
}: UseGetTransactionsOptions) => {
  const { authUser } = useAuthUserStore();
  return useTypedQuery<typeof getTransactions>({
    ...config,
    queryFn: () => getTransactions(params),
    queryKey: ['transactions', params.listingId],
    enabled: Boolean(authUser),
  });
};
