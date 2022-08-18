import { NextPageWithLayout } from '@bookfair/next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';
import { RootLayout } from '../layouts';

const HomePage: NextPageWithLayout = () => {
  const router = useRouter();

  useLayoutEffect(
    function redirect() {
      router.push('/listing');
    },
    [router]
  );

  return (
    <section>
      <Head>
        <title>Home - Bookfair</title>
      </Head>

      <h2>Bookfair</h2>
    </section>
  );
};

HomePage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default HomePage;
