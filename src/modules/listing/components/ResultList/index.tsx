import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { DbListing } from '../../types';
import { ResultListItem } from './ResultListItem';

export interface ResultListProps {
  listings: DbListing[];
}

export const ResultList = ({ listings }: ResultListProps) => {
  if (listings.length === 0) return <p>(No results)</p>;
  const promotedListings = listings.filter(
    (listing) => listing.promote && listing.promote > 0
  );
  const nonPromotedListings = listings.filter((listing) => !listing.promote);

  return (
    <ListGroup as="ul" className="row gap-3">
      {promotedListings.map((listing) => (
        <ListGroupItem as="li" className="border-0" key={listing.id}>
          <ResultListItem listing={listing} />
        </ListGroupItem>
      ))}
      {nonPromotedListings.map((listing) => (
        <ListGroupItem as="li" className="border-0" key={listing.id}>
          <ResultListItem listing={listing} />
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};
