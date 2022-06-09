import { NextPageWithLayout } from '@bookfair/next';
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import { RootLayout } from '../../layouts';
import {
  DeleteUserButton,
  SignoutButton,
  useDbUserQuery,
  UserAvatar,
  UserProfileUpdateForm,
} from '../../modules/user-profile';
import { useAuthUserStore } from '../../stores';
import { WithQueryData } from '../../ui/WithQueryData';
import { useAuthRoute } from '../../utils/useAuthRoute';

const UserMePage: NextPageWithLayout = () => {
  useAuthRoute();
  const { authUser } = useAuthUserStore();
  const dbUserQuery = useDbUserQuery(authUser?.uid);

  return (
    <WithQueryData query={dbUserQuery}>
      {(dbUser) => (
        <Container className="mx-auto col-lg-4">
          <Head>
            <title>Profile</title>
          </Head>

          <div className="d-flex justify-content-end">
            <SignoutButton />
          </div>

          <div className="mt-5 shadow p-5 rounded">
            <UserAvatar uid={dbUser.uid} />
            <p className="h3 text-center mt-2">{dbUser.displayName}</p>
            <div className="mt-3">
              <UserProfileUpdateForm />
            </div>
          </div>

          <div className="text-center mt-3">
            <DeleteUserButton />
          </div>
        </Container>
      )}
    </WithQueryData>
  );
};

UserMePage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default UserMePage;
