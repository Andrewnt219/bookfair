import { NextPageWithLayout } from '@bookfair/next';
import { RootLayout } from '../../layouts';

const ListingPage: NextPageWithLayout = () => {
  return <div>Listing</div>;
};

ListingPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default ListingPage;
