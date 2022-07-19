import { Icon } from '@iconify/react';
import React from 'react';
import { Rating } from 'react-simple-star-rating';
import { WithQueryData } from '../../../../ui';
import { useUserRating } from '../../api/useUserRating';
import { DbUser } from '../../types';

export interface UserProfileProps {
  className?: string;
  user: DbUser;
}

export const UserProfile = (props: UserProfileProps) => {
  const ratingQuery = useUserRating({ userId: props.user.uid });

  return (
    <section className={props.className}>
      <div className="d-flex flex-column align-items-center">
        <h1 className="h3 mt-2">{props.user.displayName}</h1>
        <WithQueryData query={ratingQuery}>
          {(response) => (
            <div className="d-flex gap-1 align-items-end justify-content-center">
              <Rating size={20} ratingValue={response.rating} readonly />

              <span className="h6 text-muted fw-normal mb-0">
                {(response.rating * 5) / 100}
              </span>
            </div>
          )}
        </WithQueryData>{' '}
      </div>

      <dl className="mt-5">
        <dt>Bio</dt>
        <dd>{props.user.bio}</dd>
      </dl>
    </section>
  );
};
