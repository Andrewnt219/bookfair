import dayjs from 'dayjs';
import React from 'react';
import { Container, Stack } from 'react-bootstrap';
import { BackButton } from '../../../ui';
import { CreatedUsersChart } from '../components/CreatedUsersChart';
import { ListingsLimitChart } from '../components/ListingsLimitChart';

export interface AdminStatsUsersReportProps {
  startDate: string;
  endDate: string;
}

export const AdminStatsUsersReportRoute = (
  props: AdminStatsUsersReportProps
) => {
  const uiDateRange = (
    <p className="text-muted">
      from {dayjs(props.startDate).format('MMM DD, YYYY')} to{' '}
      {dayjs(props.endDate).format('MMM DD, YYYY')}{' '}
    </p>
  );
  return (
    <Container as="section" fluid className="col-lg-4">
      <BackButton />

      <Stack gap={3}>
        <section>
          <h2 className="h2 mt-3">Created users</h2>
          {uiDateRange}
          <div className="p-3 shadow rounded ">
            <CreatedUsersChart
              startDate={props.startDate}
              endDate={props.endDate}
            />
          </div>
        </section>

        <section>
          <h2 className="h2 mt-3">Slot Listings</h2>
          {uiDateRange}
          <div className="p-3 shadow rounded ">
            <ListingsLimitChart
              startDate={props.startDate}
              endDate={props.endDate}
            />
          </div>
        </section>
      </Stack>
    </Container>
  );
};
