import React from 'react';
import { WithQueryData } from '../../../../../ui/WithQueryData';
import { useListingPhotoSources } from '../../../api';
import { DbListing } from '../../../types';
import NextLink from 'next/link';
import { Badge, Card } from 'react-bootstrap';
import dayjs from 'dayjs';
import { Icon } from '@iconify/react';
import { formatCurrency } from '../../../../../utils';

export interface ResultListItemProps {
  listing: DbListing;
}

export const ResultListItem = ({ listing }: ResultListItemProps) => {
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
              <p className="mt-3"> {listing.description}</p>{' '}
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
                    <dd>
                      {dayjs
                        .unix(listing.promote)
                        .format('MMMM DD, YYYY hh:mm:ss A')}
                    </dd>
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
              <div className="d-flex gap-1 justify-content-end">
                <NextLink href={`/listing/${listing.id}`}>
                  <a className="btn btn-primary">View</a>
                </NextLink>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </WithQueryData>
  );
};
