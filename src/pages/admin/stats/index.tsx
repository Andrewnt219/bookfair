import { NextPageWithLayout } from '@bookfair/next';
import { RootLayout } from '../../../layouts';
import { AdminStatsRoute } from '../../../modules/stats';
import { useAdminRoute } from '../../../utils';

const AdminStatsPage: NextPageWithLayout = () => {
  useAdminRoute();

  return <AdminStatsRoute />;
};

AdminStatsPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default AdminStatsPage;
