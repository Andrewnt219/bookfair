import { NextPageWithLayout } from '@bookfair/next';
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import { RootLayout } from '../layouts';
import { useAuthUserSlice } from '../stores';
import { UserProfileUpdateForm } from '../modules/user-profile';
import { useAuthRoute } from '../utils/useAuthRoute';

const Home: NextPageWithLayout = () => {
  useAuthRoute();
  const { authUser } = useAuthUserSlice();

  return (
    <Container className="mx-auto col-lg-4">
      <Head>
        <title>Profile</title>
      </Head>

      <h1>Hello {authUser?.displayName}</h1>

      <div className="mt-5 shadow p-5 rounded">
        <UserProfileUpdateForm />
      </div>
    </Container>
  );
};

Home.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default Home;
