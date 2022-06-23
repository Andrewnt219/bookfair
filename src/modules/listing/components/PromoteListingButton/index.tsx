import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { PromoteListingForm } from '../PromoteListingForm';
import { usePromoteListingButton } from './usePromoteListingButton';

export interface PromoteListingButtonProps {
  listingId: string;
}

export const PromoteListingButton = (props: PromoteListingButtonProps) => {
  const { dialog } = usePromoteListingButton();

  return (
    <>
      <Button variant="success" onClick={dialog.open}>
        Promote
      </Button>

      <Modal show={dialog.isOpen} onHide={dialog.close} centered>
        <Modal.Header closeButton>
          <Modal.Title>Promote listing</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <PromoteListingForm
            listingId={props.listingId}
            onSubmit={dialog.close}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
