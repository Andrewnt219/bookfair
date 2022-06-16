import { NextPageWithLayout } from '@bookfair/next';
import { FormEventHandler, useState } from 'react';
import { RootLayout } from '../../layouts';
import { axios } from '../../lib/axios';
import { CreateListingForm } from '../../modules/listing';
import { useAuthRoute } from '../../utils/useAuthRoute';

const UserListingsPage: NextPageWithLayout = () => {
  useAuthRoute();

  return <CreateListingForm />;
};

UserListingsPage.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default UserListingsPage;
