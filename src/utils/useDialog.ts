import { useState } from 'react';

export interface UseDialogProps {
  defaultIsOpen?: boolean;
  onOpen?(): void;
  onClose?(): void;
}
export const useDialog = (props: UseDialogProps = {}) => {
  const [isOpen, setIsOpen] = useState(props.defaultIsOpen ?? false);

  const open = () => {
    props.onOpen?.();
    setIsOpen(true);
  };

  const close = () => {
    props.onClose?.();
    setIsOpen(false);
  };

  return { isOpen, open, close };
};
