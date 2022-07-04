import { NextPageWithLayout } from '@bookfair/next';
import { RootLayout } from '../../layouts';
import { ListingList } from '../../modules/listing';
import { useGetListingsByUser } from '../../modules/listing/api';
import { useAuthUserStore } from '../../stores';
import { WithQueryData } from '../../ui/WithQueryData';
import { useAuthRoute } from '../../utils/useAuthRoute';
import NextLink from 'next/link';
import { Button, Container } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { useDbUserQuery } from '../../modules/user-profile';

const UserListingsPage: NextPageWithLayout = () => {
  useAuthRoute();
  const { authUser } = useAuthUserStore();
  const getListingsQuery = useGetListingsByUser({ userId: authUser?.uid });
  const userProfileQuery = useDbUserQuery(authUser?.uid);

  return (
    <WithQueryData query={getListingsQuery}>
      {(listings) => (
        <WithQueryData query={userProfileQuery}>
          {(profile) => (
            <Container fluid as="section" className="col-lg-4">
              <h1>My listings</h1>
              <p className="text-muted">
                {listings.length}/{profile.listingLimit} listings used
              </p>

              <div className="mt-5">
                {listings.length === profile.listingLimit ? (
                  <NextLink href="/listing/purchase">
                    <a className="btn btn-primary d-inline-flex gap-2 align-items-center">
                      Purchase more listings
                      <Icon icon="bi:cart-plus-fill" width={20} />
                    </a>
                  </NextLink>
                ) : (
                  <NextLink href="/listing/new">
                    <a className="btn btn-primary d-inline-flex gap-2 align-items-center">
                      Create new listing
                      <Icon icon="bi:plus-circle-fill" width={20} />
                    </a>
                  </NextLink>
                )}
              </div>

              <div className="mt-4">
                <ListingList listings={listings} />
              </div>
            </Container>
          )}
        </WithQueryData>
      )}
    </WithQueryData>
  );
};

UserListingsPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default UserListingsPage;
