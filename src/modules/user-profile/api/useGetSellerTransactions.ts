import { axios } from '../../../lib/axios';
import { firebaseAuth } from '../../../lib/firebase';
import { QueryConfig, useTypedQuery } from '../../../lib/react-query';
import { Transaction_GetBySeller } from '../../../pages/api/transaction/getBySeller';
import { DbTransaction } from '../../listing';

const getTransactions = async (): Promise<DbTransaction[]> => {
  const { data } = await axios.get<Transaction_GetBySeller['return']>(
    '/transaction/getBySeller'
  );
  return data.data;
};

export interface UseGetSellerTransactionsOptions {
  config?: QueryConfig<typeof getTransactions>;
}

export const useGetSellerTransactions = (
  props: UseGetSellerTransactionsOptions = {}
) => {
  const userId = firebaseAuth.currentUser?.uid;
  return useTypedQuery<typeof getTransactions>({
    ...props.config,
    queryKey: ['transactions', userId],
    queryFn: () => getTransactions(),
    enabled: Boolean(userId),
  });
};
