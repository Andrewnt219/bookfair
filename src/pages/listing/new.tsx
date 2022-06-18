import { NextPageWithLayout } from '@bookfair/next';
import { RootLayout } from '../../layouts';
import { CreateListingForm } from '../../modules/listing';
import { BackButton } from '../../ui';
import { useAuthRoute } from '../../utils/useAuthRoute';

const ListingNewPage: NextPageWithLayout = () => {
  useAuthRoute();

  return (
    <section>
      <BackButton />
      <CreateListingForm />
    </section>
  );
};

ListingNewPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default ListingNewPage;
