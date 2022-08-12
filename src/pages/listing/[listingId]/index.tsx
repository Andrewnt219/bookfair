import { NextPageWithLayout } from '@bookfair/next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Spinner } from 'react-bootstrap';
import { z } from 'zod';
import { RootLayout } from '../../../layouts';
import { ListingDetailsPage } from '../../../modules/listing';

const querySchema = z.object({
  listingId: z.string().min(1, { message: 'listingId is required' }),
});

const ListingIdPage: NextPageWithLayout = () => {
  const router = useRouter();
  const query = querySchema.safeParse(router.query);
  if (!router.isReady) {
    return (
      <Spinner size="sm" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (!query.success) {
    return <h1>Invalid listing</h1>;
  }

  return (
    <>
      <Head>
        <title>View listing - Bookfair</title>
      </Head>
      <ListingDetailsPage listingId={query.data.listingId} />
    </>
  );
};

ListingIdPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default ListingIdPage;
