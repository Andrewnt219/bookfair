import React from 'react';
import { Container } from 'react-bootstrap';
import { useQueryClient } from 'react-query';
import { BackButton } from '../../../ui';
import { WithQueryData } from '../../../ui/WithQueryData';
import { useGetListing, useListingReview } from '../api';
import { EditListingForm, ReviewCard, ToggleSoldButton } from '../components';
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

  const reviewQuery = useListingReview({ listingId });

  return (
    <WithQueryData query={listingQuery}>
      {(listing) => (
        <Container as="section" fluid className="col-lg-4">
          <BackButton />
          {reviewQuery.data && (
            <div className="border p-3 rounded">
              <ReviewCard review={reviewQuery.data} />
            </div>
          )}
          <section className="shadow p-4 rounded mt-3">
            <h1>Edit listing</h1>
            <ToggleSoldButton listing={listing} />

            <EditListingForm listing={listing} />
          </section>
        </Container>
      )}
    </WithQueryData>
  );
};
