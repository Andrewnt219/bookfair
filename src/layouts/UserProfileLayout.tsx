import { Icon } from '@iconify/react';
import React, { ReactNode } from 'react';
import { Container } from 'react-bootstrap';
import {
  SignoutButton,
  useDbUserQuery,
  UserAvatar,
} from '../modules/user-profile';
import { useAuthUserStore } from '../stores';
import { WithQueryData } from '../ui/WithQueryData';
import { useAuthRoute } from '../utils/useAuthRoute';
import { RootLayout } from './RootLayout';

export interface UserProfileLayoutProps {
  children: ReactNode;
}

export const UserProfileLayout = (props: UserProfileLayoutProps) => {
  useAuthRoute();
  const { authUser } = useAuthUserStore();
  const dbUserQuery = useDbUserQuery(authUser?.uid);

  return (
    <RootLayout>
      <WithQueryData query={dbUserQuery}>
        {(dbUser) => (
          <Container className="mx-auto col-lg-4">
            <div className="position-relative pt-5">
              <div
                aria-hidden="true"
                className="bg-primary w-100 h-50 position-absolute top-0 start-0"
              />

              <div style={{ zIndex: 10, position: 'relative' }}>
                <UserAvatar uid={dbUser.uid} />
                <p className="h3 text-center mt-2">{dbUser.displayName}</p>
                <div className="text-primary h6 d-flex gap-1 align-items-center justify-content-center">
                  <Icon icon="bi:star-fill" />
                  <span>{dbUser.rating.toFixed(1)}</span>
                </div>

                <div className="d-flex justify-content-end">
                  <SignoutButton />
                </div>
              </div>
            </div>

            <div className="mt-5">{props.children}</div>
          </Container>
        )}
      </WithQueryData>
    </RootLayout>
  );
};
