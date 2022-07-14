import React from 'react';
import { Container } from 'react-bootstrap';
import { BackButton } from '../../../ui';
import { CreateReportForm } from '../components/CreateReportForm';

export const AdminStatsRoute = () => {
  return (
    <Container as="section" fluid className="col-lg-4 ">
      <BackButton />

      <article className="shadow p-5 rounded mt-3">
        <h1>Generate report</h1>
        <CreateReportForm />
      </article>
    </Container>
  );
};
