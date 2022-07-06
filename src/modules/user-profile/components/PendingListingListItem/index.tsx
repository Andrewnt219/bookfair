import Link from 'next/link';
import React from 'react';
import { formatCurrency } from '../../../../utils';
import { DbListing } from '../../../listing';

export interface TransactionListItemProps {
  listing: DbListing;
}

export const PendingListingListItem = ({
  listing,
}: TransactionListItemProps) => {
  return (
    <article className="d-flex justify-content-between align-items-center">
      <div>
        <h3 className="h5">{listing.title}</h3>
        <p className="mb-0">{formatCurrency(listing.price)}</p>
      </div>
      <Link href={`/listing/${listing.id}`}>
        <a className="btn btn-sm btn-primary">View</a>
      </Link>
    </article>
  );
};
