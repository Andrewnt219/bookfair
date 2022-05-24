import React, { ReactNode } from 'react';
import { Container } from 'react-bootstrap';
import { RootLayout } from './RootLayout';

export interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = (props: AuthLayoutProps) => {
  return (
    <RootLayout>
      <Container className="mx-auto col-lg-4">{props.children}</Container>
    </RootLayout>
  );
};
