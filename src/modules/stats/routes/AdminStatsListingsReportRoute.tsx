import dayjs from 'dayjs';
import React from 'react';
import { Container } from 'react-bootstrap';
import { BackButton } from '../../../ui';
import { CreatedListingsChart } from '../components/CreatedListingsChart';

export interface AdminStatsListingsReportRouteProps {
  startDate: string;
  endDate: string;
}

export const AdminStatsListingsReportRoute = (
  props: AdminStatsListingsReportRouteProps
) => {
  return (
    <Container as="section" fluid className="col-lg-4">
      <BackButton />
      <h1 className="mt-3">Created listings</h1>
      <p className="text-muted">
        from {dayjs(props.startDate).format('MMM YYYY')} to{' '}
        {dayjs(props.endDate).format('MMM YYYY')}{' '}
      </p>

      <CreatedListingsChart
        startDate={props.startDate}
        endDate={props.endDate}
      />
    </Container>
  );
  0;
};
