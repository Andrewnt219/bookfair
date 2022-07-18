import { NextPageWithLayout } from '@bookfair/next';
import { RootLayout } from '../../../layouts';

const ListingReportPage: NextPageWithLayout = () => {
  return (
    <section>
      <h1>Report</h1>
    </section>
  );
};

ListingReportPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default ListingReportPage;
