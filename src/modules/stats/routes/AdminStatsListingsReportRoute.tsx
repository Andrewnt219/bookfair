import dayjs from 'dayjs';
import React from 'react';
import { Container, Stack } from 'react-bootstrap';
import { BackButton } from '../../../ui';
import { CreatedListingsChart } from '../components/CreatedListingsChart';
import { ListingsPriceChart } from '../components/ListingsPriceChart';
import { TopSearchesChart } from '../components/TopSearchesChart';

export interface AdminStatsListingsReportRouteProps {
  startDate: string;
  endDate: string;
}

export const AdminStatsListingsReportRoute = (
  props: AdminStatsListingsReportRouteProps
) => {
  const uiDateRange = (
    <p className="text-muted">
      from {dayjs(props.startDate).format('MMM YYYY')} to{' '}
      {dayjs(props.endDate).format('MMM YYYY')}{' '}
    </p>
  );
  return (
    <Container as="section" fluid className="col-lg-4">
      <BackButton />

      <Stack gap={3}>
        <section>
          <h2 className="h2 mt-3">Created listings</h2>
          {uiDateRange}
          <div className="p-3 shadow rounded ">
            <CreatedListingsChart
              startDate={props.startDate}
              endDate={props.endDate}
            />
          </div>
        </section>
        <section>
          <h2 className="h2 mt-3">Price range</h2>
          {uiDateRange}
          <div className="p-3 shadow rounded ">
            <ListingsPriceChart
              startDate={props.startDate}
              endDate={props.endDate}
            />
          </div>
        </section>
        <section>
          <h2 className="h2 mt-3">Top searches</h2>
          {uiDateRange}
          <div className="p-3 shadow rounded ">
            <TopSearchesChart
              startDate={props.startDate}
              endDate={props.endDate}
            />
          </div>
        </section>
      </Stack>
    </Container>
  );
  0;
};
