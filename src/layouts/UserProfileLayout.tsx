import { Icon } from '@iconify/react';
import React, { ReactNode, useState } from 'react';
import { Container } from 'react-bootstrap';
import {
  DbUser,
  SignoutButton,
  useDbUserQuery,
  UserAvatar,
} from '../modules/user-profile';
import { useAuthUserStore } from '../stores';
import { WithQueryData } from '../ui/WithQueryData';
import { useAuthRoute } from '../utils/useAuthRoute';
import { RootLayout } from './RootLayout';

export interface UserProfileLayoutProps {
  children(dbUser: DbUser): ReactNode;
}

export const UserProfileLayout = (props: UserProfileLayoutProps) => {
  useAuthRoute();
  const { authUser } = useAuthUserStore();
  const dbUserQuery = useDbUserQuery(authUser?.uid);

  return (
    <RootLayout>
      <WithQueryData query={dbUserQuery}>
        {(dbUser) => (
          <div style={{ isolation: 'isolate' }}>
            <div className="position-relative pt-5">
              <div
                aria-hidden="true"
                className="bg-primary w-100 h-50 position-absolute top-0 start-0"
              />

              <div style={{ zIndex: 10, position: 'relative' }}>
                <UserAvatar uid={dbUser.uid} />
                <p className="h1 fw-bold text-center mt-2">
                  {dbUser.displayName}
                </p>
                {dbUser.role === 'user' && (
                  <div className="text-primary h4 fw-normal d-flex gap-1 align-items-center justify-content-center">
                    <Icon icon="bi:star-fill" />
                    <span>{dbUser.rating.toFixed(1)}</span>
                  </div>
                )}

                <div className="d-flex justify-content-end">
                  <SignoutButton />
                </div>
              </div>
            </div>

            <div className="mt-5">{props.children(dbUser)}</div>
          </div>
        )}
      </WithQueryData>
    </RootLayout>
  );
};
