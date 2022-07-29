import { NextPageWithLayout } from '@bookfair/next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { RootLayout } from '../../layouts';
import { useGetListingsByUser } from '../../modules/listing/api';
import { ResultList } from '../../modules/listing/components/ResultList';
import { useDbUserQuery, UserAvatar } from '../../modules/user-profile';
import { UserProfile } from '../../modules/user-profile';
import { WithQueryData } from '../../ui/WithQueryData';

const UserUserIdPage: NextPageWithLayout = () => {
  const { query } = useRouter();
  const userId = query.userId?.toString();
  const dbUserQuery = useDbUserQuery(userId);
  const listingsQuery = useGetListingsByUser({ userId });

  if (!dbUserQuery.data) {
    return <h1>User not found</h1>;
  }

  if (dbUserQuery.data.isActive === false || dbUserQuery.data.suspension) {
    return <h1>Deactivated</h1>;
  }

  return (
    <WithQueryData query={dbUserQuery}>
      {(dbUser) => (
        <section>
          <Head>
            <title>{dbUser.displayName}</title>
          </Head>

          <div className="mt-5 shadow p-5 rounded">
            <UserAvatar uid={dbUser.uid} />
            <UserProfile user={dbUser} />
          </div>

          <article className="mt-4">
            <h2>Current listings</h2>
            <WithQueryData query={listingsQuery}>
              {(listings) => (
                <ResultList
                  listings={listings.filter(
                    (listing) => !listing.isSold && listing.isActive
                  )}
                />
              )}
            </WithQueryData>
          </article>
        </section>
      )}
    </WithQueryData>
  );
};

UserUserIdPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default UserUserIdPage;
