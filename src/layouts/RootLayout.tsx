import React, { ReactNode, useState } from 'react';
import { Container } from 'react-bootstrap';
import { AppBar } from '../ui';

export interface DefaultLayoutProps {
  children: ReactNode;
}

export const RootLayout = (props: DefaultLayoutProps) => {
  return (
    <Container fluid>
      <main className="mt-5 pb-5">{props.children}</main>
      <AppBar />
    </Container>
  );
};
