import { NextPageWithLayout } from '@bookfair/next';
import { useRouter } from 'next/router';
import { Spinner } from 'react-bootstrap';
import { z } from 'zod';
import { RootLayout } from '../../../layouts';
import { AdminViolationDetail } from '../../../modules/violations';
import { useAdminRoute } from '../../../utils';

const querySchema = z.object({
  violationId: z.string().min(1),
});
const AdminViolationsPage: NextPageWithLayout = () => {
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
  if (!query.success) return <h1>Invalid query</h1>;

  return <AdminViolationDetail violationId={query.data.violationId} />;
};

AdminViolationsPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default AdminViolationsPage;
