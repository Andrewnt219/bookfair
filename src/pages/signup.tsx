import { NextPageWithLayout } from '@bookfair/next';
import Head from 'next/head';
import React from 'react';
import { AuthLayout } from '../layouts';
import { SigninForm, SignupForm } from '../modules/auth';

const SignupPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>

      <h1>Sign up</h1>

      <div className="mt-5 shadow p-5 rounded">
        <SignupForm />
      </div>
    </>
  );
};

SignupPage.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default SignupPage;
