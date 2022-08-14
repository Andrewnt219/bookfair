import Image from 'next/image';
import React, { ReactNode } from 'react';
import { Container } from 'react-bootstrap';
import { AppBar, BackButton } from '../ui';
import logo from '../assets/logo.png';
import Link from 'next/link';

export interface DefaultLayoutProps {
  children: ReactNode;
}

export const RootLayout = (props: DefaultLayoutProps) => {
  return (
    <Container fluid>
      <main className="mt-5 pb-5">
        <Container as="section" fluid className="col-lg-4">
          <Container className="d-flex justify-content-between align-items-center">
            <BackButton />

            <Link href="/listing">
              <a style={{ width: 100, aspectRatio: '1/1' }}>
                <Image
                  src={logo}
                  width={500}
                  height={500}
                  alt=""
                  layout="responsive"
                />
              </a>
            </Link>
          </Container>

          <div className="mt-3">{props.children}</div>
        </Container>
      </main>
      <AppBar />
    </Container>
  );
};
