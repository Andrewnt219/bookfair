import { NextPageWithLayout } from '@bookfair/next';
import { RootLayout } from '../../../layouts';
import { AdminViolationRoute } from '../../../modules/violations';
import { useAdminRoute } from '../../../utils';

const AdminViolationsPage: NextPageWithLayout = () => {
  useAdminRoute();

  return <AdminViolationRoute />;
};

AdminViolationsPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default AdminViolationsPage;
