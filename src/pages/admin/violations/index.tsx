import { NextPageWithLayout } from '@bookfair/next';
import Head from 'next/head';
import { RootLayout } from '../../../layouts';
import { AdminViolationRoute } from '../../../modules/violations';
import { useAdminRoute } from '../../../utils';

const AdminViolationsPage: NextPageWithLayout = () => {
  useAdminRoute();

  return (
    <>
      <Head>
        <title>All violations - Bookfair</title>
      </Head>
      <AdminViolationRoute />;
    </>
  );
};

AdminViolationsPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default AdminViolationsPage;
