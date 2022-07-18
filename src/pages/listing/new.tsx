import { NextPageWithLayout } from '@bookfair/next';
import { RootLayout } from '../../layouts';
import { CreateListingForm } from '../../modules/listing';
import { useAuthRoute } from '../../utils/useAuthRoute';

const ListingNewPage: NextPageWithLayout = () => {
  useAuthRoute();

  return (
    <section>
      <div className="shadow rounded p-4 mt-3">
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
