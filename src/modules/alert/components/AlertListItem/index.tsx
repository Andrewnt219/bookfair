import dayjs from 'dayjs';
import React from 'react';
import { Card } from 'react-bootstrap';
import { DbAlert } from '../../types';
import { DeleteAlertButton } from '../DeleteAlertButton';

export interface AlertListItemProps {
  alert: DbAlert;
}

export const AlertListItem = ({ alert }: AlertListItemProps) => {
  const timeUntilExpires = dayjs.unix(alert.createdAt).add(7, 'day');

  return (
    <Card as="article">
      <Card.Body>
        <Card.Title>{alert.search}</Card.Title>
        <div>
          <Card.Text
            as="time"
            title={timeUntilExpires.format('MMM DD, YYYY hh:mm A')}
            dateTime={timeUntilExpires.toISOString()}
          >
            Expires {timeUntilExpires.fromNow()}
          </Card.Text>
        </div>
        <div className="mt-3">
          <DeleteAlertButton alertId={alert.id} />
        </div>
      </Card.Body>
    </Card>
  );
};
