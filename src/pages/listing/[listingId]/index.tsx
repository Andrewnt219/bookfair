import { NextPageWithLayout } from '@bookfair/next';
import { useRouter } from 'next/router';
import { z } from 'zod';
import { RootLayout } from '../../../layouts';
import { ListingDetailsPage } from '../../../modules/listing';

const querySchema = z.object({
  listingId: z.string().min(1, { message: 'listingId is required' }),
});

const ListingNewPage: NextPageWithLayout = () => {
  const router = useRouter();
  const query = querySchema.safeParse(router.query);

  if (!query.success) {
    return <h1>Invalid listing</h1>;
  }

  return <ListingDetailsPage listingId={query.data.listingId} />;
};

ListingNewPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default ListingNewPage;
