import React from 'react';
import { DbUser } from '../../user-profile';
import { DeactivateUserButton } from './DeactivateUserButton';

export interface ActivatedUserListItemProps {
  user: DbUser;
}

export const ActivatedUserListItem = (props: ActivatedUserListItemProps) => {
  return (
    <article>
      <h3 className="h4">{props.user.displayName}</h3>
      <DeactivateUserButton userId={props.user.uid} />
    </article>
  );
};
