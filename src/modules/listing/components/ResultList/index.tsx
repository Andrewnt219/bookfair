import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { DbListing } from '../../types';
import { ResultListItem } from './ResultListItem';

export interface ResultListProps {
  listings: DbListing[];
}

export const ResultList = ({ listings }: ResultListProps) => {
  if (listings.length === 0) return <p>(No results)</p>;

  return (
    <ListGroup as="ul" className="row gap-3">
      {listings.map((listing) => (
        <ListGroupItem as="li" className="border-0" key={listing.id}>
          <ResultListItem listing={listing} />
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};
