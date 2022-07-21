import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { DbUser } from '../../user-profile';
import { ActivatedUserListItem } from './ActivatedUserListItem';

export interface ActivatedUserListProps {
  users: DbUser[];
}

export const ActivatedUserList = (props: ActivatedUserListProps) => {
  if (props.users.length === 0) return <p>(No users)</p>;

  return (
    <ListGroup>
      {props.users.map((user) => (
        <ListGroup.Item key={user.uid}>
          <ActivatedUserListItem user={user} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
