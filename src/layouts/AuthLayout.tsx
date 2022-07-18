import React, { ReactNode } from 'react';
import { RootLayout } from './RootLayout';

export interface AuthLayoutProps {
  children: ReactNode;
  title: ReactNode;
}

export const AuthLayout = (props: AuthLayoutProps) => {
  return (
    <RootLayout>
      <section>
        <h1>{props.title}</h1>

        {props.children}
      </section>
    </RootLayout>
  );
};
