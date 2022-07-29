import { NextPageWithLayout } from '@bookfair/next';
import Head from 'next/head';
import { RootLayout } from '../../layouts';
import { ListingSearchPage } from '../../modules/listing';

const ListingPage: NextPageWithLayout = () => {
  return (
    <div>
      <Head>
        <title>Search listings</title>
      </Head>
      <ListingSearchPage />
    </div>
  );
};

ListingPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default ListingPage;
