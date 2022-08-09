import { NextPageWithLayout } from '@bookfair/next';
import { GetServerSideProps, GetStaticProps } from 'next';
import { RootLayout } from '../layouts';

const HomePage: NextPageWithLayout = () => {
  return (
    <section>
      <h2>Bookfair</h2>
    </section>
  );
};

HomePage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    redirect: {
      destination: '/listing',
      permanent: false,
    },
  };
};

export default HomePage;
