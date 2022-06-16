import React from 'react';
import { WithQueryData } from '../../../../../ui/WithQueryData';
import { useListingPhotoSources } from '../../../api';
import { DbListing } from '../../../types';
import NextLink from 'next/link';
import { Button, Card, Stack } from 'react-bootstrap';

export interface ListingListItemProps {
  listing: DbListing;
}

export const ListingListItem = ({ listing }: ListingListItemProps) => {
  const photoSourcesQuery = useListingPhotoSources({ photos: listing.photos });

  return (
    <Card as="article">
      <WithQueryData query={photoSourcesQuery}>
        {(sources) => (
          <Card.Img
            style={{ objectFit: 'cover', aspectRatio: '1/1' }}
            variant="top"
            src={sources[0]}
          />
        )}
      </WithQueryData>

      <Card.Body>
        <Card.Title>{listing.title}</Card.Title>
        <Card.Text>
          <dl>
            <dt>View count</dt>
            <dd> {listing.viewCount}</dd>
            <dt>Description</dt>
            <dd> {listing.description}</dd>
            <dt>Price</dt>
            <dd> {listing.price}</dd>
          </dl>

          <Stack direction="horizontal" gap={1}>
            <NextLink href={`/listing/${listing.id}/edit`}>
              <a className="btn btn-primary">Edit</a>
            </NextLink>

            <Button variant="danger">Delete</Button>
          </Stack>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
