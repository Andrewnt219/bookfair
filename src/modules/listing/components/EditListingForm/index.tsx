import React from 'react';
import { useQueryClient } from 'react-query';
import { WithQueryData } from '../../../../ui/WithQueryData';
import { useGetListing } from '../../api';
import { DbListing } from '../../types';

export interface EditListingFormProps {
  listingId: string;
}

export const EditListingForm = (props: EditListingFormProps) => {
  const queryClient = useQueryClient();

  const listingQuery = useGetListing({
    listingId: props.listingId,
    config: {
      initialData() {
        const listings: DbListing[] = queryClient.getQueryData('listing') ?? [];
        return listings.find((d) => d.id === props.listingId);
      },
      initialDataUpdatedAt() {
        return queryClient.getQueryState('listing')?.dataUpdatedAt;
      },
    },
  });

  return (
    <WithQueryData query={listingQuery}>
      {(listing) => <pre>{JSON.stringify(listing, null, 2)}</pre>}
    </WithQueryData>
  );
};
