import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';
import React from 'react';

export const BackButton = () => {
  const router = useRouter();
  const onClick = () => router.back();

  return (
    <a href="#" onClick={onClick} className="d-inline-flex align-items-center">
      <Icon icon="bi:arrow-left-short" width={25} /> Go back
    </a>
  );
};
