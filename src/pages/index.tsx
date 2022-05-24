import { NextPageWithLayout } from '@bookfair/next';
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import { RootLayout } from '../layouts';
import { SignupForm } from '../modules/auth';

const Home: NextPageWithLayout = () => {
  return (
    <Container className="mx-auto col-lg-4">
      <Head>
        <title>Sign up</title>
      </Head>

      <h1>Sign up</h1>

      <div className="mt-5 shadow p-5 rounded">
        <SignupForm />
      </div>
    </Container>
  );
};

Home.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default Home;
