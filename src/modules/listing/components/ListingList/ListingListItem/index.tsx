import React from 'react';
import { WithQueryData } from '../../../../../ui/WithQueryData';
import { useListingPhotoSources } from '../../../api';
import { DbListing } from '../../../types';
import NextLink from 'next/link';
import { Badge, Card } from 'react-bootstrap';
import { DeleteListingButton } from '../../DeleteListingButton';
import { PromoteListingButton } from '../../PromoteListingButton';
import dayjs from 'dayjs';
import { Icon } from '@iconify/react';
import { formatCurrency } from '../../../../../utils';

export interface ListingListItemProps {
  listing: DbListing;
}

export const ListingListItem = ({ listing }: ListingListItemProps) => {
  const photoSourcesQuery = useListingPhotoSources({ photos: listing.photos });

  return (
    <WithQueryData query={photoSourcesQuery}>
      {(sources) => (
        <Card as="article">
          <Card.Img
            style={{ objectFit: 'cover', aspectRatio: '1/1' }}
            variant="top"
            src={sources[0]}
          />

          <Card.Body>
            <Card.Title>{listing.title}</Card.Title>

            <Card.Text as="div">
              <ul className="list-unstyled d-flex gap-1 flex-wrap">
                {listing.tags.map((tag, index) => (
                  <li key={index}>
                    <Badge bg="light" text="dark">
                      {tag}
                    </Badge>
                  </li>
                ))}
              </ul>
              <p className="mt-3"> {listing.description}</p>
              <dl
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'min-content max-content',
                  gap: '0.5rem 1rem',
                }}
              >
                {listing.promote && (
                  <>
                    <dt className="text-danger">
                      <Icon
                        icon="bi:chevron-double-up"
                        aria-label="Promotion's end date"
                      />
                    </dt>
                    <dd>Expires {dayjs.unix(listing.promote).fromNow()}</dd>
                  </>
                )}
                <dt>
                  <Icon
                    icon="bi:aspect-ratio-fill"
                    aria-label="Listing's course"
                  />
                </dt>
                <dd>{listing.course}</dd>

                <dt>
                  <Icon icon="bi:cart-fill" aria-label="Listing's Price" />
                </dt>
                <dd>{formatCurrency(listing.price)}</dd>

                <dt>
                  <Icon icon="bi:eye-fill" aria-label="Listing's view count" />
                </dt>
                <dd>{listing.viewCount}</dd>
              </dl>
              {listing.isSold ? (
                <div className="d-flex gap-1 justify-content-between align-items-center">
                  <span className="h6 text-danger">SOLD</span>
                  <NextLink href={`/listing/${listing.id}/edit`}>
                    <a className="btn btn-primary">Edit</a>
                  </NextLink>
                </div>
              ) : (
                <div className="d-flex gap-1 justify-content-end">
                  {!listing.promote && (
                    <PromoteListingButton listingId={listing.id} />
                  )}
                  <DeleteListingButton listingId={listing.id} />
                  <NextLink href={`/listing/${listing.id}/edit`}>
                    <a className="btn btn-primary">Edit</a>
                  </NextLink>
                </div>
              )}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </WithQueryData>
  );
};
