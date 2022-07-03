import type { AppProps } from 'next/app';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from '../lib/react-query';
import { ReactElement, useEffect } from 'react';
import { NextPageWithLayout } from '@bookfair/next';
import '../styles/main.scss';
import { ToastManagement } from '../ui';
import { useAuthUserStore } from '../stores';
import { firebaseAuth } from '../lib/firebase';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page: ReactElement) => page);
  const { setAuthUser, unsetAuthUser } = useAuthUserStore();

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) setAuthUser(user);
      else unsetAuthUser();
    });
  }, [setAuthUser, unsetAuthUser]);

  return (
    <QueryClientProvider client={queryClient}>
      {getLayout(<Component {...pageProps} />)}
      <ToastManagement timeInMs={5000} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
