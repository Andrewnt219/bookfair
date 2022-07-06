import { axios } from '../../../lib/axios';
import { firebaseAuth } from '../../../lib/firebase';
import { QueryConfig, useTypedQuery } from '../../../lib/react-query';
import { Transaction_GetByBuyer } from '../../../pages/api/transaction/getByBuyer';
import { DbTransaction } from '../../listing';

const getTransactions = async (): Promise<DbTransaction[]> => {
  const { data } = await axios.get<Transaction_GetByBuyer['return']>(
    '/transaction/getByBuyer'
  );
  return data.data;
};

export interface UseGetTransactionsOptions {
  config?: QueryConfig<typeof getTransactions>;
}

export const useGetTransactions = (props: UseGetTransactionsOptions = {}) => {
  const userId = firebaseAuth.currentUser?.uid;
  return useTypedQuery<typeof getTransactions>({
    ...props.config,
    queryKey: ['transactions', userId],
    queryFn: () => getTransactions(),
    enabled: Boolean(userId),
  });
};
