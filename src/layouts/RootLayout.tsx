import React, { ReactNode } from 'react';
import { Container } from 'react-bootstrap';
import { AppBar, BackButton } from '../ui';

export interface DefaultLayoutProps {
  children: ReactNode;
}

export const RootLayout = (props: DefaultLayoutProps) => {
  return (
    <Container fluid>
      <main className="mt-5 pb-5">
        <Container as="section" fluid className="col-lg-4">
          <BackButton />

          <div className="mt-3">{props.children}</div>
        </Container>
      </main>
      <AppBar />
    </Container>
  );
};
