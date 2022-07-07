import { NextPageWithLayout } from '@bookfair/next';
import { useRouter } from 'next/router';
import { z } from 'zod';
import { RootLayout } from '../../layouts';
import { TransactionIdRoute } from '../../modules/user-profile';

const querySchema = z.object({
  transactionId: z.string().min(1, { message: 'transactionId is required' }),
});

const ListingIdPage: NextPageWithLayout = () => {
  const router = useRouter();
  const query = querySchema.safeParse(router.query);

  if (!query.success) {
    return <h1>Invalid listing</h1>;
  }

  return <TransactionIdRoute transactionId={query.data.transactionId} />;
};

ListingIdPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default ListingIdPage;
