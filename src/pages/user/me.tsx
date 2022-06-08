import { NextPageWithLayout } from '@bookfair/next';
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import { RootLayout } from '../../layouts';
import {
  SignoutButton,
  useDbUserQuery,
  UserAvatar,
  UserProfileUpdateForm,
} from '../../modules/user-profile';
import { useAuthUserStore } from '../../stores';
import { useAuthRoute } from '../../utils/useAuthRoute';

const UserMePage: NextPageWithLayout = () => {
  useAuthRoute();
  const { authUser } = useAuthUserStore();
  const dbUserQuery = useDbUserQuery(authUser?.uid);

  return (
    <Container className="mx-auto col-lg-4">
      <Head>
        <title>Profile</title>
      </Head>

      <h1>Hello {dbUserQuery.data?.displayName}</h1>
      <SignoutButton />

      <div className="mt-5 shadow p-5 rounded">
        {authUser && <UserAvatar uid={authUser.uid} />}
        <UserProfileUpdateForm />
      </div>
    </Container>
  );
};

UserMePage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default UserMePage;
