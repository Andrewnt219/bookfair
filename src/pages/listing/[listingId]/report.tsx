import { NextPageWithLayout } from '@bookfair/next';
import { useRouter } from 'next/router';
import { z } from 'zod';
import { RootLayout } from '../../../layouts';
import { ListingReportRoute } from '../../../modules/violations';

const querySchema = z.object({
  listingId: z.string().min(1, { message: 'listingId is required' }),
});

const ListingReportPage: NextPageWithLayout = () => {
  const router = useRouter();
  const query = querySchema.safeParse(router.query);
  if (!query.success) return <h1>Invalid listing</h1>;

  return <ListingReportRoute listingId={query.data.listingId} />;
};

ListingReportPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default ListingReportPage;
