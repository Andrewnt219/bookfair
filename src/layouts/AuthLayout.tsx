import React, { ReactNode } from "react";
import { Container } from "react-bootstrap";
import { RootLayout } from "./RootLayout";

export interface AuthLayoutProps {
  children: ReactNode;
  title: ReactNode;
}

export const AuthLayout = (props: AuthLayoutProps) => {
  return (
    <RootLayout>
      <Container className="mx-auto col-lg-4">
        <h1>{props.title}</h1>

        {props.children}
      </Container>
    </RootLayout>
  );
};
