import { NextPageWithLayout } from '@bookfair/next';
import { UserProfileLayout } from '../../layouts';
import {
  DeleteUserButton,
  UserProfileUpdateForm,
} from '../../modules/user-profile';

const UserProfilePage: NextPageWithLayout = () => {
  return (
    <UserProfileLayout>
      {() => (
        <>
          <div className="mt-5 shadow p-5 rounded">
            <UserProfileUpdateForm />
          </div>

          <div className="text-center mt-3">
            <DeleteUserButton />
          </div>
        </>
      )}
    </UserProfileLayout>
  );
};

UserProfilePage.getLayout = (page) => {
  return <>{page}</>;
};

export default UserProfilePage;
