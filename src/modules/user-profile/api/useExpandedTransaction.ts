import { axios } from '../../../lib/axios';
import { QueryConfig, useTypedQuery } from '../../../lib/react-query';
import { Transaction_Id_GetDetails } from '../../../pages/api/transaction/[transactionId]/getDetails';
import { ExpandedDbTransaction } from '../../listing';

const getExpandedTransaction = async ({
  transactionId,
  ...params
}: Transaction_Id_GetDetails['input']): Promise<ExpandedDbTransaction> => {
  const { data } = await axios.get<Transaction_Id_GetDetails['return']>(
    `/transaction/${transactionId}/getDetails`,
    { params }
  );
  return data.data;
};

export interface UseExpandedTransactionOptions {
  config?: QueryConfig<typeof getExpandedTransaction>;
  transactionId: string | null | undefined;
}

export const useExpandedTransaction = ({
  transactionId,
  config,
}: UseExpandedTransactionOptions) => {
  return useTypedQuery<typeof getExpandedTransaction>({
    ...config,
    queryKey: ['expanded-transaction', transactionId],
    // transactionId will always be defined when run
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => getExpandedTransaction({ transactionId: transactionId! }),
    enabled: Boolean(transactionId),
  });
};
