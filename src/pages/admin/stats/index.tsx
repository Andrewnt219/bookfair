import { NextPageWithLayout } from '@bookfair/next';
import Head from 'next/head';
import { RootLayout } from '../../../layouts';
import { AdminStatsRoute } from '../../../modules/stats';
import { useAdminRoute } from '../../../utils';

const AdminStatsPage: NextPageWithLayout = () => {
  useAdminRoute();

  return (
    <>
      <Head>
        <title>Stats - Bookfair</title>
      </Head>

      <AdminStatsRoute />
    </>
  );
};

AdminStatsPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default AdminStatsPage;
