import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';
import { WithQueryData } from '../../../../ui';
import { useExpandedTransaction } from '../../../user-profile';

export interface TransactionListItemProps {
  transactionId: string;
}

export const TransactionListItem = (props: TransactionListItemProps) => {
  const transactionQuery = useExpandedTransaction({
    transactionId: props.transactionId,
  });

  return (
    <WithQueryData query={transactionQuery}>
      {(transaction) => (
        <option value={transaction.id}>{transaction.buyer.email}</option>
      )}
    </WithQueryData>
  );
};
