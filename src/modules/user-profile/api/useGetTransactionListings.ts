import { axios } from '../../../lib/axios';
import { firebaseAuth } from '../../../lib/firebase';
import { QueryConfig, useTypedQuery } from '../../../lib/react-query';
import { Transaction_GetBuyerPendingListings } from '../../../pages/api/transaction/getBuyerPendingListings';
import { DbListing } from '../../listing';

const getTransactionListings = async (): Promise<DbListing[]> => {
  const { data } = await axios.get<
    Transaction_GetBuyerPendingListings['return']
  >('/transaction/getBuyerPendingListings');
  return data.data;
};

export interface UseGetTransactionListingsOptions {
  config?: QueryConfig<typeof getTransactionListings>;
}

export const useGetTransactionListings = (
  props: UseGetTransactionListingsOptions = {}
) => {
  const userId = firebaseAuth.currentUser?.uid;
  return useTypedQuery<typeof getTransactionListings>({
    ...props.config,
    queryKey: ['transaction-listings', userId],
    queryFn: () => getTransactionListings(),
    enabled: Boolean(userId),
  });
};
