import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { DbListing } from '../../../listing';
import { PendingListingListItem } from '../PendingListingListItem';

export interface PendingListingListProps {
  listings: DbListing[];
}

export const PendingListingList = (props: PendingListingListProps) => {
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
