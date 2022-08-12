import { NextPageWithLayout } from '@bookfair/next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Spinner } from 'react-bootstrap';
import { z } from 'zod';
import { RootLayout } from '../../../layouts';
import { ListingEditPage } from '../../../modules/listing';
import { useAuthRoute } from '../../../utils/useAuthRoute';

const querySchema = z.object({
  listingId: z.string().min(1, { message: 'listingId is required' }),
});

const ListingEdit: NextPageWithLayout = () => {
  useAuthRoute();
  const router = useRouter();
  if (!router.isReady) {
    return (
      <Spinner size="sm" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  const query = querySchema.safeParse(router.query);
  if (!query.success) {
    return <h1>Invalid listing</h1>;
  }

  return (
    <>
      <Head>
        <title>Edit listing - Bookfair</title>
      </Head>
      <ListingEditPage listingId={query.data.listingId} />
    </>
  );
};

ListingEdit.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default ListingEdit;
