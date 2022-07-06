import { NextPageWithLayout } from '@bookfair/next';
import { RootLayout } from '../../../layouts';
import { BackButton } from '../../../ui';

const ListingReportPage: NextPageWithLayout = () => {
  return (
    <section>
      <BackButton />
      <h1>Report</h1>
    </section>
  );
};

ListingReportPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default ListingReportPage;
