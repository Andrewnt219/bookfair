import type { AppProps } from 'next/app';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { store } from '../stores';
import { Provider } from 'react-redux';
import { queryClient } from '../lib/react-query';
import { ReactElement, ReactNode } from 'react';
import { NextPageWithLayout } from '@bookfair/next';
import '../styles/main.scss';
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page: ReactElement) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        {getLayout(<Component {...pageProps} />)}
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
