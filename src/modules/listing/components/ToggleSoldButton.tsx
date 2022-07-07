import { Icon } from '@iconify/react';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useQueryClient } from 'react-query';
import { useToastStore } from '../../../stores';
import { useMarkSold, useMarkUnsold } from '../api';
import { DbListing } from '../types';

export interface ToggleSoldButtonProps {
  listing: DbListing;
}

export const ToggleSoldButton = ({ listing }: ToggleSoldButtonProps) => {
  const invalidate = () =>
    queryClient.invalidateQueries(['listing', listing.id]);
  const queryClient = useQueryClient();
  const toastStore = useToastStore();

  const soldMutation = useMarkSold({
    config: {
      onSuccess() {
        invalidate();
      },
      onError(error) {
        toastStore.error(error);
      },
    },
  });
  const unsoldMutation = useMarkUnsold({
    config: {
      onSuccess() {
        invalidate();
      },
      onError(error) {
        toastStore.error(error);
      },
    },
  });

  const onClick = () =>
    listing.isSold
      ? unsoldMutation.mutate({ listingId: listing.id })
      : soldMutation.mutate({ listingId: listing.id });

  return (
    <Button
      disabled={unsoldMutation.isLoading || soldMutation.isLoading}
      onClick={onClick}
      variant={listing.isSold ? 'success' : 'secondary'}
      className="d-flex w-100 gap-2 align-items-center justify-content-center"
    >
      {listing.isSold ? 'Mark as unsold' : 'Mark as sold'}
      <Icon icon="bi:bag-check-fill" />
    </Button>
  );
};
