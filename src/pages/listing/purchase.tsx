import { NextPageWithLayout } from '@bookfair/next';
import { Container } from 'react-bootstrap';
import { RootLayout } from '../../layouts';
import { PurchaseSlotForm } from '../../modules/user-profile';
import { BackButton } from '../../ui';
import { useAuthRoute } from '../../utils/useAuthRoute';

const ListingPurchasePage: NextPageWithLayout = () => {
  useAuthRoute();

  return (
    <Container fluid className="col-lg-4">
      <BackButton />
      <div className="shadow p-4 rounded mt-3">
        <h1>Purchase slot</h1>
        <PurchaseSlotForm />
      </div>
    </Container>
  );
};

ListingPurchasePage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default ListingPurchasePage;
