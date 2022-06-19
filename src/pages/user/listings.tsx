import { NextPageWithLayout } from '@bookfair/next';
import { RootLayout } from '../../layouts';
import { ListingList } from '../../modules/listing';
import { useGetListings } from '../../modules/listing/api';
import { useAuthUserStore } from '../../stores';
import { WithQueryData } from '../../ui/WithQueryData';
import { useAuthRoute } from '../../utils/useAuthRoute';
import NextLink from 'next/link';
import { Container } from 'react-bootstrap';
import { Icon } from '@iconify/react';

const UserListingsPage: NextPageWithLayout = () => {
  useAuthRoute();
  const { authUser } = useAuthUserStore();
  const getListingsQuery = useGetListings({ userId: authUser?.uid });

  return (
    <Container fluid as="section" className="col-lg-4">
      <h1>My listings</h1>

      <NextLink href="/listing/new">
        <a className="btn btn-primary d-inline-flex gap-2 align-items-center mt-5">
          Create new listing
          <Icon icon="bi:plus-circle-fill" width={20} />
        </a>
      </NextLink>

      <div className="mt-4">
        <WithQueryData query={getListingsQuery}>
          {(listings) => <ListingList listings={listings} />}
        </WithQueryData>
      </div>
    </Container>
  );
};

UserListingsPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default UserListingsPage;
