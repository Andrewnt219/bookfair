import React from 'react';
import { DbListing } from '../../types';
import { ResultListItem } from './ResultListItem';

export interface ResultListProps {
  listings: DbListing[];
}

export const ResultList = ({ listings }: ResultListProps) => {
  return (
    <ul className="list-unstyled row gap-3">
      {listings.length === 0 && <p>(No results)</p>}
      {listings.map((listing) => (
        <li key={listing.id}>
          <ResultListItem listing={listing} />
        </li>
      ))}
    </ul>
  );
};
