import React, { useEffect } from 'react';
import { useToastStore } from '../../../stores';
import { WithQueryData } from '../../../ui/WithQueryData';
import { useGetListing, useIncreaseView, useUpdateListing } from '../api';

export interface ListingDetailsPageProps {
  listingId: string;
}

const DELAY_BEFORE_INCREASE_VIEW = 5000;

export const ListingDetailsPage = ({ listingId }: ListingDetailsPageProps) => {
  const getListingQuery = useGetListing({ listingId });
  const toastStore = useToastStore();
  const increaseViewMutation = useIncreaseView({
    config: {
      onError(error) {
        toastStore.error(error);
      },
    },
  });

  useEffect(() => {
    setTimeout(function increaseView() {
      increaseViewMutation.mutate({
        listingId,
      });
    }, DELAY_BEFORE_INCREASE_VIEW);
    // No need to add increaseViewMutation to the dependencies array
    // This cause extra rerenders every delayed seconds
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listingId]);

  return (
    <WithQueryData query={getListingQuery}>
      {(listing) => <pre>{JSON.stringify(listing, null, 2)}</pre>}
    </WithQueryData>
  );
};
