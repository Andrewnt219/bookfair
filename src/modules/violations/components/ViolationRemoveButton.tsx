import { useRouter } from 'next/router';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useQueryClient } from 'react-query';
import { useToastStore } from '../../../stores';
import { useDialog } from '../../../utils';
import { useResolveViolation } from '../data/useResolveViolation';
import { ExpandedDbViolation } from '../types';

export interface ViolationRemoveButtonProps {
  violation: ExpandedDbViolation;
}

export const ViolationRemoveButton = ({
  violation,
}: ViolationRemoveButtonProps) => {
  const dialog = useDialog();
  const toastStore = useToastStore();
  const router = useRouter();
  const qc = useQueryClient();
  const resolveViolation = useResolveViolation({
    config: {
      onError(error) {
        toastStore.error(error);
      },
      onSuccess() {
        qc.invalidateQueries('violations');
        toastStore.success(`Listing is removed successfully`);
        dialog.close();
        router.push('/admin/violations');
      },
    },
  });

  const onAccept = () =>
    resolveViolation.mutate({
      id: violation.id,
      listingId: violation.listing.id,
      result: 'accepted',
    });

  return (
    <>
      <Button variant="danger" onClick={dialog.open}>
        Remove listing
      </Button>

      <Modal show={dialog.isOpen} onHide={dialog.close} centered>
        <Modal.Header closeButton>
          <Modal.Title>Removing listing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This listing is about to be removed from the marketplace. This action
          cannot be reversed
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={dialog.close}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onAccept}
            disabled={resolveViolation.isLoading}
          >
            Remove listing
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
