import { NextPageWithLayout } from '@bookfair/next';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { z } from 'zod';
import { RootLayout } from '../../../layouts';
import { AdminStatsUsersReportRoute } from '../../../modules/stats';
import { useAdminRoute } from '../../../utils';
import isEmpty from 'lodash/isEmpty';

const querySchema = z.object({
  startDate: z
    .string()
    .refine((val) => dayjs(val).isValid(), { message: 'Invalid start date' }),
  endDate: z
    .string()
    .refine((val) => dayjs(val).isValid(), { message: 'Invalid end date' }),
});

const AdminUsersReport: NextPageWithLayout = () => {
  useAdminRoute();
  const router = useRouter();
  if (isEmpty(router.query)) return <h1>Initiating...</h1>;
  const query = querySchema.safeParse(router.query);
  if (!query.success) return <h1>Invalid date</h1>;

  return (
    <AdminStatsUsersReportRoute
      startDate={query.data.startDate}
      endDate={query.data.endDate}
    />
  );
};

AdminUsersReport.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default AdminUsersReport;
