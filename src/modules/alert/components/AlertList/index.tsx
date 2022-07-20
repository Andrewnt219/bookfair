import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { DbAlert } from '../../types';
import { AlertListItem } from '../AlertListItem';

export interface AlertListProps {
  alerts: DbAlert[];
}

export const AlertList = (props: AlertListProps) => {
  if (props.alerts.length === 0) return <p>(No active alerts)</p>;

  return (
    <ListGroup as="ul">
      {props.alerts.map((alert) => (
        <ListGroupItem className="border-0" key={alert.id}>
          <AlertListItem alert={alert} />
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};
