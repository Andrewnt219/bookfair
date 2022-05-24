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

      <h1>Sign in</h1>

      <div className="mt-5 shadow p-5 rounded">
        <SigninForm />
      </div>
    </>
  );
};

SigninPage.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default SigninPage;
