import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useQueryClient } from 'react-query';
import { useToastStore } from '../../../../stores';
import { useDialog } from '../../../../utils';
import { useDeleteAlert } from '../../api/useDeleteAlert';

export interface DeleteAlertButtonProps {
  alertId: string;
}

export const DeleteAlertButton = (props: DeleteAlertButtonProps) => {
  const dialog = useDialog();
  const qc = useQueryClient();
  const toastStore = useToastStore();
  const deleteMutation = useDeleteAlert({
    config: {
      onSuccess() {
        toastStore.success('Alert deleted successfully');
        qc.invalidateQueries('alerts');
      },
      onError(error) {
        toastStore.error(error);
      },
    },
  });

  const onConfirm = () => {
    deleteMutation.mutate({
      alertId: props.alertId,
    });
  };

  return (
    <>
      <Button variant="danger" onClick={dialog.open}>
        Delete alert
      </Button>

      <Modal show={dialog.isOpen} onHide={dialog.close}>
        <Modal.Header closeButton>
          <Modal.Title>Deleting alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You&apos;re about to delete this alert. This action cannot be reversed
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={dialog.close}>
            Close
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Delete alert
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
