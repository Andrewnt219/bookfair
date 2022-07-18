import React from 'react';
import { CreateReportForm } from '../components/CreateReportForm';

export const AdminStatsRoute = () => {
  return (
    <section>
      <article className="shadow p-5 rounded mt-3">
        <h1>Generate report</h1>
        <CreateReportForm />
      </article>
    </section>
  );
};
