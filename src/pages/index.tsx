import { useAtom } from 'jotai';
import type { NextPage } from 'next';
import Head from 'next/head';
import { SigninForm } from '../modules/signin';
import { SignupForm } from '../modules/signup';
import { authUserAtom } from '../store';

const Home: NextPage = () => {
  const [authUser] = useAtom(authUserAtom);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {authUser && <h1>Hello {authUser.displayName}</h1>}
        <SignupForm />
        <SigninForm />
      </main>
    </div>
  );
};

export default Home;
