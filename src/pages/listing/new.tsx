import { NextPageWithLayout } from '@bookfair/next';
import Head from 'next/head';
import { RootLayout } from '../../layouts';
import { CreateListingForm } from '../../modules/listing';
import { useAuthRoute } from '../../utils/useAuthRoute';

const ListingNewPage: NextPageWithLayout = () => {
  useAuthRoute();

  return (
    <section>
      <div className="shadow rounded p-4 mt-3">
        <Head>
          <title>Create listing - Bookfair</title>
        </Head>

        <h1>New listing</h1>
        <CreateListingForm />
      </div>
    </section>
  );
};

ListingNewPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default ListingNewPage;
