import { axios } from '../../../lib/axios';
import { firebaseAuth } from '../../../lib/firebase';
import { QueryConfig, useTypedQuery } from '../../../lib/react-query';
import { Transaction_GetDone } from '../../../pages/api/transaction/getDone';

const getDoneTransactions = async () => {
  const { data } = await axios.get<Transaction_GetDone['return']>(
    '/transaction/getDone'
  );
  return data.data;
};

export interface UseDoneTransactionsOptions {
  config?: QueryConfig<typeof getDoneTransactions>;
}

export const useDoneTransactions = (props: UseDoneTransactionsOptions = {}) => {
  const userId = firebaseAuth.currentUser?.uid;

  return useTypedQuery<typeof getDoneTransactions>({
    ...props.config,
    queryKey: ['done-transactions', userId],
    queryFn: getDoneTransactions,
    enabled: Boolean(userId),
  });
};
