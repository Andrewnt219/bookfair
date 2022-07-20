import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';
import { Badge, Card } from 'react-bootstrap';
import { WithQueryData } from '../../../ui';
import { useGetListing } from '../../listing/api';
import { useViolationContext } from '../contexts/ViolationContext';
import clsx from 'clsx';
export const ViolationListItem = () => {
  const { violation } = useViolationContext();
  const listingQuery = useGetListing({ listingId: violation.listingId });

  return (
    <WithQueryData query={listingQuery}>
      {(listing) => (
        <Card as="article">
          <Card.Body>
            <Card.Title className="d-flex justify-content-between">
              <span>{listing.title}</span>
              <Badge
                pill
                className={clsx(
                  violation.result === 'pending' && 'bg-secondary',
                  violation.result === 'rejected' && 'bg-warning text-black',
                  violation.result === 'accepted' && 'bg-danger'
                )}
              >
                {violation.result}
              </Badge>
            </Card.Title>
            <Card.Text
              as="time"
              dateTime={dayjs.unix(violation.createdAt).toISOString()}
              className="text-muted"
            >
              Reported {dayjs.unix(violation.createdAt).fromNow()}
            </Card.Text>
            <Card.Text>Violation: {violation.type}</Card.Text>
            <div>
              <Link href={`/admin/violations/${violation.id}`}>
                <a className="btn btn-sm btn-primary">View</a>
              </Link>
            </div>
          </Card.Body>
        </Card>
      )}
    </WithQueryData>
  );
};
