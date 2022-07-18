import React from 'react';
import { WithQueryData } from '../../../ui/WithQueryData';
import { useSearchListingsQuery } from '../api';
import { SearchListingResult, SearchListingsForm } from '../components';

export const ListingSearchPage = () => {
  const searchQuery = useSearchListingsQuery();

  return (
    <section>
      <div className="mt-3">
        <h1>Search listings</h1>
        <div className="shadow rounded mt-3 p-4">
          <SearchListingsForm />
        </div>

        <WithQueryData query={searchQuery}>
          {(listings) => (
            <div className="mt-5">
              <SearchListingResult listings={listings} />
            </div>
          )}
        </WithQueryData>
      </div>
    </section>
  );
};
