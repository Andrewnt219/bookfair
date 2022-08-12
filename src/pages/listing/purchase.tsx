import { NextPageWithLayout } from '@bookfair/next';
import Head from 'next/head';
import { RootLayout } from '../../layouts';
import { PurchaseSlotForm } from '../../modules/user-profile';
import { useAuthRoute } from '../../utils/useAuthRoute';

const ListingPurchasePage: NextPageWithLayout = () => {
  useAuthRoute();

  return (
    <section>
      <Head>
        <title>Purchase more slots - Bookfair</title>
      </Head>

      <div className="shadow p-4 rounded mt-3">
        <h1>Purchase slot</h1>
        <PurchaseSlotForm />
      </div>
    </section>
  );
};

ListingPurchasePage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default ListingPurchasePage;
