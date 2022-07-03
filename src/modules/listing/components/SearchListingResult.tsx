import React from 'react';
import { DbListing } from '../types';
import { ResultList } from './ResultList';

export interface SearchListingResultProps {
  listings: DbListing[];
}
export const SearchListingResult = ({ listings }: SearchListingResultProps) => {
  return (
    <section>
      <h2>{listings.length} listings</h2>
      <ResultList listings={listings} />
    </section>
  );
};
