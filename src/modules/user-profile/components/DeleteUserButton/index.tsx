import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDialog } from '../../../../utils';
import { useDeleteUserMutation } from '../../api/useDeleteUserMutation';

export const DeleteUserButton = () => {
  const deleteUserMutation = useDeleteUserMutation();
  const dialog = useDialog();

  const onConfirm = () => {
    deleteUserMutation.mutate(undefined);
  };

  return (
    <>
      <a href="#" className="text-danger" onClick={dialog.open}>
        Delete my account
      </a>

      <Modal show={dialog.isOpen} onHide={dialog.close} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woah, your account is going to be deleted. All of your listings will
          be inactive.{' '}
          <span className="fw-bold">This action cannot be undone!</span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={dialog.close}>
            Close
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Delete this account
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
