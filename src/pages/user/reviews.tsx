import { NextPageWithLayout } from '@bookfair/next';
import { Container } from 'react-bootstrap';
import { RootLayout } from '../../layouts';
import {
  PendingListingList,
  TransactionList,
  useDoneTransactions,
  useGetBuyerPendingListings,
} from '../../modules/user-profile';
import { WithQueryData } from '../../ui';
import { useAuthRoute } from '../../utils/useAuthRoute';

const UserReviewsPage: NextPageWithLayout = () => {
  useAuthRoute();
  const pendingListingsQuery = useGetBuyerPendingListings();
  const doneTransactionsQuery = useDoneTransactions();

  return (
    <Container fluid className="col-lg-4">
      <section>
        <h2>Pending transactions</h2>
        <WithQueryData query={pendingListingsQuery}>
          {(listings) => <PendingListingList listings={listings} />}
        </WithQueryData>
      </section>

      <section className="mt-3">
        <h2>Done listings</h2>
        <WithQueryData query={doneTransactionsQuery}>
          {(transactions) => <TransactionList transactions={transactions} />}
        </WithQueryData>
      </section>
    </Container>
  );
};

UserReviewsPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default UserReviewsPage;
