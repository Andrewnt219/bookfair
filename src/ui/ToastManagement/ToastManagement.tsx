import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toastActions, useToastSlice } from '../../stores';

export interface ToastManagementProps {
  className?: string;
  timeInMs: number;
}

export const ToastManagement = (props: ToastManagementProps) => {
  const { toasts } = useToastSlice();
  const dispatch = useDispatch();

  return (
    <ToastContainer position="top-end">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          bg={toast.variant}
          autohide
          onClose={() => dispatch(toastActions.dequeue({ id: toast.id }))}
          delay={props.timeInMs}
        >
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
};
