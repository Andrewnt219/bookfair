import { NextPageWithLayout } from '@bookfair/next';
import { RootLayout } from '../../layouts';
import { ListingSearchPage } from '../../modules/listing';

const ListingPage: NextPageWithLayout = () => {
  return (
    <div>
      <ListingSearchPage />
    </div>
  );
};

ListingPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default ListingPage;
