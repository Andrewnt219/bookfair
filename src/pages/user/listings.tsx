import { NextPageWithLayout } from '@bookfair/next';
import { RootLayout } from '../../layouts';
import { ListingList } from '../../modules/listing';
import { useGetListings } from '../../modules/listing/api';
import { useAuthUserStore } from '../../stores';
import { WithQueryData } from '../../ui/WithQueryData';
import { useAuthRoute } from '../../utils/useAuthRoute';
import NextLink from 'next/link';

const UserListingsPage: NextPageWithLayout = () => {
  useAuthRoute();
  const { authUser } = useAuthUserStore();
  const getListingsQuery = useGetListings({ userId: authUser?.uid });

  return (
    <section>
      <WithQueryData query={getListingsQuery}>
        {(listings) => <ListingList listings={listings} />}
      </WithQueryData>

      <NextLink href="/listing/new">
        <a className="btn btn-primary">Create new listing</a>
      </NextLink>
    </section>
  );
};

UserListingsPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default UserListingsPage;
