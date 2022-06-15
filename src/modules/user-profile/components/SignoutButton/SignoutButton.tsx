import React from 'react';
import { Button } from 'react-bootstrap';
import { useSignoutButton } from './useSignoutButton';

export const SignoutButton = () => {
  const { signoutMutation } = useSignoutButton();

  const onButtonClick = () => signoutMutation.mutate(undefined);

  return (
    <Button onClick={onButtonClick} variant="danger" size="sm">
      Sign out
    </Button>
  );
};
