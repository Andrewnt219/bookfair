import { NextPageWithLayout } from '@bookfair/next';
import { RootLayout } from '../../layouts';
import { useAdminRoute } from '../../utils';

const AdminViolationsPage: NextPageWithLayout = () => {
  useAdminRoute();

  return <section>Admin violations</section>;
};

AdminViolationsPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default AdminViolationsPage;
