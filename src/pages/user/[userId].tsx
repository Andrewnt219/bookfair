import { NextPageWithLayout } from '@bookfair/next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container } from 'react-bootstrap';
import { RootLayout } from '../../layouts';
import { useDbUserQuery, UserAvatar } from '../../modules/user-profile';
import { UserProfile } from '../../modules/user-profile';
import { WithQueryData } from '../../ui/WithQueryData';

const UserUserIdPage: NextPageWithLayout = () => {
  const { query } = useRouter();
  const userId = query.userId?.toString();
  const dbUserQuery = useDbUserQuery(userId);

  if (dbUserQuery.data?.isActive === false) {
    return <h1>Deactivated</h1>;
  }

  return (
    <WithQueryData query={dbUserQuery}>
      {(dbUser) => (
        <Container className="mx-auto col-lg-4">
          <Head>
            <title>{dbUser.displayName}</title>
          </Head>

          <div className="mt-5 shadow p-5 rounded">
            <UserAvatar uid={dbUser.uid} />
            <UserProfile user={dbUser} />
          </div>
        </Container>
      )}
    </WithQueryData>
  );
};

UserUserIdPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default UserUserIdPage;
