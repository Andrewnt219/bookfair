import { NextPageWithLayout } from '@bookfair/next';
import { RootLayout } from '../../../layouts';
import { AdminUsersRoute } from '../../../modules/user-manage';
import { useAdminRoute } from '../../../utils';

const AdminUsersPage: NextPageWithLayout = () => {
  useAdminRoute();

  return <AdminUsersRoute />;
};

AdminUsersPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default AdminUsersPage;
