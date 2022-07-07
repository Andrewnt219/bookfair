import Link from 'next/link';
import React from 'react';
import { Badge, Button, ButtonGroup } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';
import { WithQueryData } from '../../../../ui';
import { formatCurrency } from '../../../../utils';
import { useExpandedTransaction } from '../../api';
import { RatingModalButton } from '../RatingModalButton';

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
        <article className="d-flex gap-2 justify-content-between align-items-center">
          <div>
            <h3 className="h5">{transaction.listing.title}</h3>
            <p>{formatCurrency(transaction.listing.price)}</p>
            {transaction.review ? (
              <Rating
                size={16}
                readonly
                ratingValue={transaction.review.rating}
              />
            ) : (
              <Badge className="bg-warning text-black">Need review</Badge>
            )}
          </div>

          <div className="d-flex flex-wrap  gap-1 justify-content-end">
            <Link href={`/listing/${transaction.listing.id}`}>
              <a className="btn btn-sm btn-secondary">View</a>
            </Link>
            <RatingModalButton transaction={transaction} />
          </div>
        </article>
      )}
    </WithQueryData>
  );
};
