import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Button, Form, Modal, Stack } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useToastStore } from '../../../stores';
import { useDialog } from '../../../utils';
import { useDeactivateUser } from '../data/useDeactivateUser';
import {
  createSuspensionSchema,
  CreateSuspensionSchema,
} from '../types/create-suspension-schema';

export interface DeactivateUserButtonProps {
  userId: string;
}

export const DeactivateUserButton = (props: DeactivateUserButtonProps) => {
  const dialog = useDialog();
  const qc = useQueryClient();
  const toastStore = useToastStore();
  const form = useForm<CreateSuspensionSchema>({
    resolver: zodResolver(createSuspensionSchema),
    defaultValues: {
      reason: '',
    },
  });
  const deactivateUser = useDeactivateUser({
    config: {
      onError(error) {
        toastStore.error(error);
      },
      onSuccess() {
        qc.invalidateQueries('users');
        toastStore.success('User has been deactivated');
        dialog.close();
      },
    },
  });

  const { errors } = form.formState;

  const onSubmit = form.handleSubmit((data) =>
    deactivateUser.mutate({
      reason: data.reason,
      userId: props.userId,
    })
  );

  return (
    <>
      <Button size="sm" variant="danger" onClick={dialog.open}>
        Deactivate
      </Button>

      <Modal show={dialog.isOpen} onHide={dialog.close} centered>
        <Modal.Header closeButton>
          <Modal.Title>Deactivating user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            id="create-suspension-form"
            noValidate
            validated={form.formState.isValid}
            onSubmit={onSubmit}
          >
            <Stack gap={2}>
              <Form.Group controlId="suspension-reason">
                <Form.Label>Reason</Form.Label>
                <Controller
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <Form.Control
                      as="textarea"
                      type="text"
                      isInvalid={Boolean(errors.reason)}
                      placeholder="Reason for deactivation"
                      {...field}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.reason?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Stack>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={dialog.close}>
            Cancel
          </Button>
          <Button
            variant="danger"
            type="submit"
            form="create-suspension-form"
            disabled={deactivateUser.isLoading}
          >
            Deactivate user
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
