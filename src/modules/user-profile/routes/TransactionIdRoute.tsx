import React from 'react';
import { WithQueryData } from '../../../ui';
import { useAuthRoute } from '../../../utils/useAuthRoute';
import { useExpandedTransaction } from '../api';

export interface TransactionIdRouteProps {
  transactionId: string;
}

export const TransactionIdRoute = ({
  transactionId,
}: TransactionIdRouteProps) => {
  useAuthRoute();
  const transactionQuery = useExpandedTransaction({ transactionId });

  return (
    <WithQueryData query={transactionQuery}>
      {(transaction) => <pre>{JSON.stringify(transaction, null, 2)}</pre>}
    </WithQueryData>
  );
};
