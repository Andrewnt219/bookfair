import { Icon } from '@iconify/react';
import React from 'react';
import { DbUser } from '../../types';

export interface UserProfileProps {
  className?: string;
  user: DbUser;
}

export const UserProfile = (props: UserProfileProps) => {
  return (
    <section className={props.className}>
      <div className="d-flex flex-column align-items-center">
        <h1 className="h3 mt-2">{props.user.displayName}</h1>

        <div className="d-flex gap-1 align-items-center">
          <Icon icon="bi:star-fill" />
          <span>{props.user.rating.toFixed(1)}</span>
        </div>
      </div>

      <dl className="mt-5">
        <dt>Bio</dt>
        <dd>{props.user.bio}</dd>
      </dl>
    </section>
  );
};
