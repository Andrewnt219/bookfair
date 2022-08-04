import React from 'react';
import { Button } from 'react-bootstrap';
import { useQueryClient } from 'react-query';
import { useToastStore } from '../../../stores';
import { WithQueryData } from '../../../ui/WithQueryData';
import { useGetSellerTransactions } from '../../user-profile';
import { useGetListing, useListingReview, useMarkUnsold } from '../api';
import { EditListingForm, ReviewCard } from '../components';
import { TransactionList } from '../components/TransactionList';
import { DbListing } from '../types';

export interface ListingEditPageProps {
  listingId: string;
}

export const ListingEditPage = ({ listingId }: ListingEditPageProps) => {
  const queryClient = useQueryClient();
  const toastStore = useToastStore();

  const unsoldMutation = useMarkUnsold({
    config: {
      onSuccess() {
        queryClient.invalidateQueries(['transactions']);
        queryClient.invalidateQueries(['listing', listingId]);
      },
      onError(error) {
        toastStore.error(error);
      },
    },
  });
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
  const transactionsQuery = useGetSellerTransactions();

  const soldTransaction = transactionsQuery.data?.find((t) => !t.isPending);

  const onUnsoldClick = () => {
    if (!soldTransaction) return toastStore.error('No sold transaction found');
    unsoldMutation.mutate({ transactionId: soldTransaction.id });
  };
  return (
    <WithQueryData query={listingQuery}>
      {(listing) => (
        <section>
          {reviewQuery.data && (
            <div className="border p-3 rounded">
              <ReviewCard review={reviewQuery.data} />
            </div>
          )}
          <section className="shadow p-4 rounded mt-3">
            <h1>Edit listing</h1>

            <EditListingForm listing={listing} />
          </section>

          <section className="mt-4">
            {soldTransaction ? (
              <Button
                disabled={unsoldMutation.isLoading}
                variant="danger"
                onClick={onUnsoldClick}
              >
                Mark as unsold
              </Button>
            ) : (
              <WithQueryData query={transactionsQuery}>
                {(transactions) => (
                  <TransactionList transactions={transactions} />
                )}
              </WithQueryData>
            )}
          </section>
        </section>
      )}
    </WithQueryData>
  );
};
