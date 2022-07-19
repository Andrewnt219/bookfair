import { Icon } from '@iconify/react';
import React, { ReactNode } from 'react';
import { Rating } from 'react-simple-star-rating';
import {
  DbUser,
  SignoutButton,
  useDbUserQuery,
  UserAvatar,
} from '../modules/user-profile';
import { useUserRating } from '../modules/user-profile/api/useUserRating';
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
  const ratingQuery = useUserRating({ userId: authUser?.uid });

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
                  <WithQueryData query={ratingQuery}>
                    {(response) => (
                      <div className="d-flex gap-1 align-items-end justify-content-center">
                        <Rating
                          size={20}
                          ratingValue={response.rating}
                          readonly
                        />

                        <span className="h6 text-muted fw-normal mb-0">
                          {(response.rating * 5) / 100}
                        </span>
                      </div>
                    )}
                  </WithQueryData>
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
