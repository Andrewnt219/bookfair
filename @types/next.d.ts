declare module '@bookfair/next' {
  import { NextPage } from 'next';
  import { ReactElement, ReactNode } from 'react';

  // next.js define as empty
  // eslint-disable-next-line @typescript-eslint/ban-types
  export type NextPageWithLayout<Props = {}> = NextPage<Props> & {
    getLayout?: (page: ReactElement) => ReactNode;
  };
}
