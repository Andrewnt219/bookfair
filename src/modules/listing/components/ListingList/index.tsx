import React from 'react';
import { DbListing } from '../../types';
import { ListingListItem } from './ListingListItem';

export interface ListingListProps {
  listings: DbListing[];
}

export const ListingList = ({ listings }: ListingListProps) => {
  return (
    <ul className="list-unstyled row gap-3">
      {listings.map((listing) => (
        <li key={listing.id}>
          <ListingListItem listing={listing} />
        </li>
      ))}
    </ul>
  );
};
