import React from 'react';
import { Container } from 'react-bootstrap';
import { useQueryClient } from 'react-query';
import { BackButton } from '../../../ui';
import { WithQueryData } from '../../../ui/WithQueryData';
import { useGetListing } from '../api';
import { EditListingForm } from '../components';
import { DbListing } from '../types';

export interface ListingEditPageProps {
  listingId: string;
}

export const ListingEditPage = ({ listingId }: ListingEditPageProps) => {
  const queryClient = useQueryClient();

  const listingQuery = useGetListing({
    listingId,
    config: {
      initialData() {
        const listings: DbListing[] = queryClient.getQueryData('listing') ?? [];
        return listings.find((d) => d.id === listingId);
      },
      initialDataUpdatedAt() {
        return queryClient.getQueryState('listing')?.dataUpdatedAt;
      },
    },
  });

  return (
    <WithQueryData query={listingQuery}>
      {(listing) => (
        <Container as="section" fluid className="col-lg-4">
          <BackButton />
          <div className="shadow p-4 rounded mt-3">
            <h1>Edit listing</h1>
            <EditListingForm listing={listing} />
          </div>
        </Container>
      )}
    </WithQueryData>
  );
};
