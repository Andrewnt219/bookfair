import { NextPageWithLayout } from '@bookfair/next';
import { GetServerSideProps, GetStaticProps } from 'next';
import Head from 'next/head';
import { RootLayout } from '../layouts';

const HomePage: NextPageWithLayout = () => {
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

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
    redirect: {
      destination: '/listing',
      permanent: false,
    },
  };
};

export default HomePage;
