import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDialog } from '../../../../utils';
import { ExpandedDbTransaction } from '../../../listing';
import { CreateReviewForm } from '../CreateReviewForm';

export interface RatingModalButtonProps {
  transaction: ExpandedDbTransaction;
}

export const RatingModalButton = ({ transaction }: RatingModalButtonProps) => {
  const dialog = useDialog();

  return (
    <>
      <Button variant="primary" size="sm" onClick={dialog.open}>
        Rate
      </Button>

      <Modal show={dialog.isOpen} onHide={dialog.close} centered>
        <Modal.Header closeButton>
          <Modal.Title>Rate your transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateReviewForm
            onSubmit={dialog.close}
            transactionId={transaction.id}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
