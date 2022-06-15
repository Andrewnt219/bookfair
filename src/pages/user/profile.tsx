import { NextPageWithLayout } from '@bookfair/next';
import { UserProfileLayout } from '../../layouts';
import {
  DeleteUserButton,
  UserProfileUpdateForm,
} from '../../modules/user-profile';

const UserProfilePage: NextPageWithLayout = () => {
  return (
    <>
      <div className="mt-5 shadow p-5 rounded">
        <UserProfileUpdateForm />
      </div>

      <div className="text-center mt-3">
        <DeleteUserButton />
      </div>
    </>
  );
};

UserProfilePage.getLayout = (page) => {
  return <UserProfileLayout>{page}</UserProfileLayout>;
};

export default UserProfilePage;
