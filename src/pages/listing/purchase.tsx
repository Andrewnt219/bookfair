import { NextPageWithLayout } from '@bookfair/next';
import { Container } from 'react-bootstrap';
import { RootLayout } from '../../layouts';
import { BackButton } from '../../ui';
import { useAuthRoute } from '../../utils/useAuthRoute';

const ListingPurchasePage: NextPageWithLayout = () => {
  useAuthRoute();

  return (
    <Container fluid className="col-lg-4">
      <BackButton />
      <h1>Purchase</h1>
    </Container>
  );
};

ListingPurchasePage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default ListingPurchasePage;
