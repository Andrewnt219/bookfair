import { axios } from '../../../lib/axios';
import { firebaseAuth } from '../../../lib/firebase';
import { QueryConfig, useTypedQuery } from '../../../lib/react-query';
import { Transaction_GetBuyerPendingListings } from '../../../pages/api/transaction/getBuyerPendingListings';
import { DbListing } from '../../listing';

const getBuyerPendingListings = async (): Promise<DbListing[]> => {
  const { data } = await axios.get<
    Transaction_GetBuyerPendingListings['return']
  >('/transaction/getBuyerPendingListings');
  return data.data;
};

export interface UseGetBuyerPendingListingsOptions {
  config?: QueryConfig<typeof getBuyerPendingListings>;
}

export const useGetBuyerPendingListings = (
  props: UseGetBuyerPendingListingsOptions = {}
) => {
  const userId = firebaseAuth.currentUser?.uid;
  return useTypedQuery<typeof getBuyerPendingListings>({
    ...props.config,
    queryKey: ['pending-transaction-listings', userId],
    queryFn: () => getBuyerPendingListings(),
    enabled: Boolean(userId),
  });
};
