import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { DbListing } from '../../../listing';
import { PendingListingListItem } from '../PendingListingListItem';

export interface TransactionListProps {
  listings: DbListing[];
}

export const PendingListingList = (props: TransactionListProps) => {
  return (
    <ListGroup as="ul">
      {props.listings.map((listing) => (
        <ListGroup.Item as="li" key={listing.id}>
          <PendingListingListItem listing={listing} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
