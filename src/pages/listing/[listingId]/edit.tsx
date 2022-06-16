import { NextPageWithLayout } from '@bookfair/next';
import { useRouter } from 'next/router';
import { z } from 'zod';
import { RootLayout } from '../../../layouts';
import { useAuthRoute } from '../../../utils/useAuthRoute';

const querySchema = z.object({
  listingId: z.string().min(1, { message: 'listingId is required' }),
});

const ListingNewPage: NextPageWithLayout = () => {
  useAuthRoute();
  const router = useRouter();
  const query = querySchema.safeParse(router.query);
  if (!query.success) {
    return <h1>Invalid listing</h1>;
  }

  return <section>{query.data.listingId}</section>;
};

ListingNewPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default ListingNewPage;
