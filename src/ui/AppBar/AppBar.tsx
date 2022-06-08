import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Nav } from 'react-bootstrap';
import { Icon } from '@iconify/react';

export interface AppBarProps {
  className?: string;
}

export const AppBar = () => {
  const { pathname } = useRouter();

  return (
    <header className="fixed-bottom bg-light">
      <Nav variant="pills" as="nav" activeKey={pathname} fill>
        <Nav.Item>
          <Link href="/user/me" passHref>
            <Nav.Link>
              <Icon icon="bi:house-door-fill" />
            </Nav.Link>
          </Link>
        </Nav.Item>

        <Nav.Item>
          <Link href="/listing" passHref>
            <Nav.Link>
              <Icon icon="bi:basket3-fill" />
            </Nav.Link>
          </Link>
        </Nav.Item>
      </Nav>
    </header>
  );
};
