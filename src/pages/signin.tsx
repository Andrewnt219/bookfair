import { NextPageWithLayout } from '@bookfair/next';
import Head from 'next/head';
import React from 'react';
import { AuthLayout } from '../layouts';
import { SigninForm } from '../modules/auth';

const SigninPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>

      <div className="mt-5 shadow p-5 rounded">
        <SigninForm />
        testing
      </div>
    </>
  );
};

SigninPage.getLayout = (page) => {
  return <AuthLayout title="Sign in">{page}</AuthLayout>;
};

export default SigninPage;
