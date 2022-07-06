import { NextPageWithLayout } from '@bookfair/next';
import { Container } from 'react-bootstrap';
import { RootLayout } from '../../layouts';
import {
  useDoneTransactions,
  useGetTransactionListings,
} from '../../modules/user-profile';
import { PendingListingList } from '../../modules/user-profile/components/PendingListingList';
import { WithQueryData } from '../../ui';
import { useAuthRoute } from '../../utils/useAuthRoute';

const UserReviewsPage: NextPageWithLayout = () => {
  useAuthRoute();
  const listingsQuery = useGetTransactionListings();
  const doneTransactionsQuery = useDoneTransactions();

  return (
    <Container fluid className="col-lg-4">
      <WithQueryData query={listingsQuery}>
        {(listings) => (
          <section>
            <h2>Pending transactions</h2>
            <PendingListingList listings={listings} />
          </section>
        )}
      </WithQueryData>

      <WithQueryData query={doneTransactionsQuery}>
        {(transactions) => (
          <section className="mt-3">
            <h2>Previous transactions</h2>
          </section>
        )}
      </WithQueryData>
    </Container>
  );
};

UserReviewsPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default UserReviewsPage;
