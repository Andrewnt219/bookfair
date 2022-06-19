import { NextPageWithLayout } from '@bookfair/next';
import { Container } from 'react-bootstrap';
import { RootLayout } from '../../layouts';
import { BackButton, PriceSummary } from '../../ui';
import { useAuthRoute } from '../../utils/useAuthRoute';

const ListingPurchasePage: NextPageWithLayout = () => {
  useAuthRoute();

  return (
    <Container fluid className="col-lg-4">
      <BackButton />
      <h1>Purchase slot</h1>
      <PriceSummary subtotal={10.3213213213} tax={0.13} />
    </Container>
  );
};

ListingPurchasePage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default ListingPurchasePage;
