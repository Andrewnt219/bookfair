import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useQueryClient } from 'react-query';
import { useAuthUserStore, useToastStore } from '../../../stores';
import { useDialog } from '../../../utils';
import { useDeleteListing } from '../api';

export interface DeleteListingButtonProps {
  listingId: string;
}

export const DeleteListingButton = ({
  listingId,
}: DeleteListingButtonProps) => {
  const dialog = useDialog();
  const toastStore = useToastStore();
  const queryClient = useQueryClient();
  const { authUser } = useAuthUserStore();

  const deleteMutation = useDeleteListing({
    config: {
      onSuccess() {
        toastStore.success('Listing deleted');
        queryClient.invalidateQueries(['listings', authUser?.uid]);
      },
      onError(error) {
        toastStore.error(error);
      },
    },
  });

  const onAccept = () => {
    deleteMutation.mutate({ listingId });
  };

  return (
    <>
      <Button onClick={dialog.open} variant="danger">
        Delete
      </Button>

      <Modal show={dialog.isOpen} onHide={dialog.close} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete listing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your listing is about to be removed from the marketplace. This action
          cannot be reversed
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={dialog.close}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onAccept}
            disabled={deleteMutation.isLoading}
          >
            Delete listing
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
