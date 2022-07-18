import React from 'react';
import { DbAlert } from '../../types';
import { AlertListItem } from '../AlertListItem';

export interface AlertListProps {
  alerts: DbAlert[];
}

export const AlertList = (props: AlertListProps) => {
  return (
    <ul className="list-unstyled">
      {props.alerts.length === 0 && <p>(No active alerts)</p>}
      {props.alerts.map((alert) => (
        <li key={alert.id}>
          <AlertListItem alert={alert} />
        </li>
      ))}
    </ul>
  );
};
