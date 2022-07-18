import { NextPageWithLayout } from '@bookfair/next';
import { RootLayout } from '../../layouts';
import { UserAlertsRoute } from '../../modules/alert';
import { useAuthRoute } from '../../utils/useAuthRoute';

const AdminStatsPage: NextPageWithLayout = () => {
  useAuthRoute();

  return <UserAlertsRoute />;
};

AdminStatsPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default AdminStatsPage;
