import { NextPageWithLayout } from '@bookfair/next';
import { RootLayout } from '../../layouts';
import { CreateListingForm } from '../../modules/listing';
import { useAuthRoute } from '../../utils/useAuthRoute';

const ListingNewPage: NextPageWithLayout = () => {
  useAuthRoute();

  return <CreateListingForm />;
};

ListingNewPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default ListingNewPage;
