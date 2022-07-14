import dayjs from 'dayjs';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { Badge, Button, Container } from 'react-bootstrap';
import { businessRules } from '../../../constants';
import { useToastStore } from '../../../stores';
import { BackButton, PhotosGrid } from '../../../ui';
import { WithQueryData } from '../../../ui/WithQueryData';
import { formatCurrency } from '../../../utils';
import { useDbUserQuery } from '../../user-profile';
import {
  useCreateTransaction,
  useGetListing,
  useIncreaseView,
  useListingPhotoSources,
} from '../api';

export interface ListingDetailsPageProps {
  listingId: string;
}

export const ListingDetailsPage = ({ listingId }: ListingDetailsPageProps) => {
  const getListingQuery = useGetListing({ listingId });
  const userQuery = useDbUserQuery(getListingQuery.data?.userId);
  const toastStore = useToastStore();
  const increaseViewMutation = useIncreaseView({
    config: {
      onError(error) {
        toastStore.error(error);
      },
    },
  });
  const contactMutation = useCreateTransaction({
    config: {
      onError(error) {
        toastStore.error(error);
      },
      onSuccess() {
        toastStore.success('Seller has been notified');
      },
    },
  });
  const photoSrcsQuery = useListingPhotoSources({
    photos: getListingQuery.data?.photos ?? [],
  });

  const onContactClick = () => contactMutation.mutate({ listingId });

  useEffect(
    function increaseView() {
      setTimeout(function increaseView() {
        increaseViewMutation.mutate({
          listingId,
        });
      }, businessRules.DELAY_BEFORE_INCREASE_VIEW);
    },
    // No need to add increaseViewMutation to the dependencies array
    // This cause extra rerenders every delayed seconds
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listingId]
  );

  return (
    <WithQueryData query={getListingQuery}>
      {(listing) => (
        <WithQueryData query={userQuery}>
          {(user) => (
            <WithQueryData query={photoSrcsQuery}>
              {(photoSrcs) => (
                <Container as="section" fluid className="col-lg-4">
                  <div className="d-flex justify-content-between gap-3 align-items-center">
                    <BackButton />
                    <Link href={`/listing/${listing.id}/report`}>
                      <a className="btn btn-sm btn-warning">Report</a>
                    </Link>
                  </div>

                  <div className="border rounded p-3 mt-3">
                    <h1>{listing.title}</h1>
                    <p className="text-muted">
                      Listed by{' '}
                      <Link href={`/user/${user.uid}`}>
                        <a>{user.displayName}</a>
                      </Link>{' '}
                      {dayjs.unix(listing.createdAt).fromNow()}
                    </p>
                    <ul className="list-unstyled d-flex flex-wrap gap-1">
                      {listing.tags.map((tag) => (
                        <li key={tag}>
                          <Badge bg="secondary">{tag}</Badge>
                        </li>
                      ))}
                    </ul>
                    <div className="d-flex justify-content-between  align-items-center gap-3">
                      <p className="h4 text-muted">
                        {formatCurrency(listing.price)}
                      </p>
                    </div>
                    <div>
                      <p>{listing.description}</p>
                      <PhotosGrid photoSrcs={photoSrcs} />
                    </div>

                    <div>
                      <Button
                        onClick={onContactClick}
                        disabled={contactMutation.isLoading}
                        className="w-100 text-center"
                        size="lg"
                        variant="primary"
                      >
                        Contact
                      </Button>
                    </div>
                  </div>
                </Container>
              )}
            </WithQueryData>
          )}
        </WithQueryData>
      )}
    </WithQueryData>
  );
};
