import { NextPageWithLayout } from '@bookfair/next';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { z } from 'zod';
import { RootLayout } from '../../../layouts';
import { AdminStatsListingsReportRoute } from '../../../modules/stats';
import { useAdminRoute } from '../../../utils';
import { Spinner } from 'react-bootstrap';
import Head from 'next/head';

const querySchema = z.object({
  startDate: z
    .string()
    .refine((val) => dayjs(val).isValid(), { message: 'Invalid start date' }),
  endDate: z
    .string()
    .refine((val) => dayjs(val).isValid(), { message: 'Invalid end date' }),
});

const AdminStatsListingsReportPage: NextPageWithLayout = () => {
  useAdminRoute();
  const router = useRouter();
  if (!router.isReady) {
    return (
      <Spinner size="sm" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  const query = querySchema.safeParse(router.query);
  if (!query.success) return <h1>Invalid date</h1>;

  return (
    <>
      <Head>
        <title>Listings report - Bookfair</title>
      </Head>
      <AdminStatsListingsReportRoute
        startDate={query.data.startDate}
        endDate={query.data.endDate}
      />
    </>
  );
};

AdminStatsListingsReportPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default AdminStatsListingsReportPage;
