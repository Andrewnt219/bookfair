import { NextPageWithLayout } from '@bookfair/next';
import { useRouter } from 'next/router';
import { Spinner } from 'react-bootstrap';
import { z } from 'zod';
import { RootLayout } from '../../../layouts';
import { ListingReportRoute } from '../../../modules/violations';

const querySchema = z.object({
  listingId: z.string().min(1, { message: 'listingId is required' }),
});

const ListingReportPage: NextPageWithLayout = () => {
  const router = useRouter();

  if (!router.isReady) {
    return (
      <Spinner size="sm" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  const query = querySchema.safeParse(router.query);
  if (!query.success) return <h1>Invalid listing</h1>;

  return <ListingReportRoute listingId={query.data.listingId} />;
};

ListingReportPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default ListingReportPage;
