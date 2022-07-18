import { NextPageWithLayout } from '@bookfair/next';
import { RootLayout } from '../../layouts';
import { PurchaseSlotForm } from '../../modules/user-profile';
import { useAuthRoute } from '../../utils/useAuthRoute';

const ListingPurchasePage: NextPageWithLayout = () => {
  useAuthRoute();

  return (
    <section>
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
