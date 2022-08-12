import { NextPageWithLayout } from '@bookfair/next';
import Head from 'next/head';
import { RootLayout } from '../../../layouts';
import { AdminUsersRoute } from '../../../modules/user-manage';
import { useAdminRoute } from '../../../utils';

const AdminUsersPage: NextPageWithLayout = () => {
  useAdminRoute();

  return (
    <>
      <Head>
        <title>All users - Bookfair</title>
      </Head>
      <AdminUsersRoute />;
    </>
  );
};

AdminUsersPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default AdminUsersPage;
