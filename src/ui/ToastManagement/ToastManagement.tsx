import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { useToastStore } from "../../stores";

export interface ToastManagementProps {
  className?: string;
  timeInMs: number;
}

export const ToastManagement = (props: ToastManagementProps) => {
  const toastStore = useToastStore();

  const onCloseToast = (toastId: string) => toastStore.dequeue(toastId);

  return (
    <ToastContainer position="top-end">
      {toastStore.toasts.map((toast) => (
        <Toast
          key={toast.id}
          bg={toast.variant}
          autohide
          onClose={() => onCloseToast(toast.id)}
          delay={props.timeInMs}
        >
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
};
