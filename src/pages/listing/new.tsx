import { NextPageWithLayout } from '@bookfair/next';
import { Container } from 'react-bootstrap';
import { RootLayout } from '../../layouts';
import { CreateListingForm } from '../../modules/listing';
import { BackButton } from '../../ui';
import { useAuthRoute } from '../../utils/useAuthRoute';

const ListingNewPage: NextPageWithLayout = () => {
  useAuthRoute();

  return (
    <Container fluid className="col-lg-4">
      <BackButton />
      <div className="shadow rounded p-4 mt-3">
        <h1>New listing</h1>
        <CreateListingForm />
      </div>
    </Container>
  );
};

ListingNewPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default ListingNewPage;
