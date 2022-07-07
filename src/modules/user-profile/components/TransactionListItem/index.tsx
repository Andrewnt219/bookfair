import Link from 'next/link';
import React from 'react';
import { Badge, Button } from 'react-bootstrap';
import { WithQueryData } from '../../../../ui';
import { formatCurrency } from '../../../../utils';
import { useExpandedTransaction } from '../../api';

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
        <article className="d-flex justify-content-between align-items-center">
          <div>
            <h3 className="h5">{transaction.listing.title}</h3>
            <p>{formatCurrency(transaction.listing.price)}</p>
            {!transaction.review && (
              <Badge className="bg-warning text-black">Need review</Badge>
            )}
          </div>

          <div>
            <Link href={`/transaction/${transaction.id}`}>
              <a className="btn btn-sm btn-primary">View</a>
            </Link>
          </div>
        </article>
      )}
    </WithQueryData>
  );
};
