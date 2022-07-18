import dayjs from 'dayjs';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { DbAlert } from '../../types';
import { DeleteAlertButton } from '../DeleteAlertButton';

export interface AlertListItemProps {
  alert: DbAlert;
}

export const AlertListItem = ({ alert }: AlertListItemProps) => {
  return (
    <Card as="article">
      <Card.Body>
        <Card.Title>{alert.search}</Card.Title>
        <div>
          <Card.Text
            as="time"
            title={dayjs.unix(alert.createdAt).format('MMM DD, YYYY hh:mm A')}
            dateTime={dayjs.unix(alert.createdAt).toISOString()}
          >
            Created {dayjs.unix(alert.createdAt).fromNow()}
          </Card.Text>
        </div>
        <div className="mt-3">
          <DeleteAlertButton alertId={alert.id} />
        </div>
      </Card.Body>
    </Card>
  );
};
