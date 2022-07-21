import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { DbDeactivatedUser } from '../../user-profile';
import { DeactivatedUserListItem } from './DeactivatedUserListItem';

export interface DeactivatedUserListProps {
  users: DbDeactivatedUser[];
}

export const DeactivatedUserList = (props: DeactivatedUserListProps) => {
  if (props.users.length === 0) return <p>(No users)</p>;

  return (
    <ListGroup>
      {props.users.map((user) => (
        <ListGroup.Item key={user.uid}>
          <DeactivatedUserListItem user={user} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
