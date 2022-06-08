import { NextPageWithLayout } from '@bookfair/next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container } from 'react-bootstrap';
import { RootLayout } from '../../layouts';
import { useDbUserQuery, UserAvatar } from '../../modules/user-profile';

const UserUserIdPage: NextPageWithLayout = () => {
  const { query } = useRouter();
  const dbUserQuery = useDbUserQuery(query.userId?.toString());

  if (dbUserQuery.error) {
    return <h1>Fail to fetch user</h1>;
  }

  if (!dbUserQuery.data) {
    return <h1>Fetching user...</h1>;
  }

  return (
    <Container className="mx-auto col-lg-4">
      <Head>
        <title>{dbUserQuery.data?.displayName}</title>
      </Head>

      <h1>{dbUserQuery.data?.displayName}</h1>

      <div className="mt-5 shadow p-5 rounded">
        <UserAvatar />
      </div>
    </Container>
  );
};

UserUserIdPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default UserUserIdPage;
