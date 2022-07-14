import dayjs from 'dayjs';
import React from 'react';
import { Container } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { BackButton, WithQueryData } from '../../../ui';
import { useCreatedListingsStats } from '../data/useCreatedListingsStats';

export interface AdminStatsListingsReportRouteProps {
  startDate: string;
  endDate: string;
}

export const AdminStatsListingsReportRoute = (
  props: AdminStatsListingsReportRouteProps
) => {
  const statsQuery = useCreatedListingsStats({
    endDate: props.endDate,
    startDate: props.startDate,
  });

  return (
    <Container as="section" fluid className="col-lg-4">
      <BackButton />
      <h1 className="mt-3">Created listings</h1>
      <p className="text-muted">
        from {dayjs(props.startDate).format('MMM YYYY')} to{' '}
        {dayjs(props.endDate).format('MMM YYYY')}{' '}
      </p>

      <WithQueryData query={statsQuery}>
        {(stats) => (
          <article className="p-3 shadow rounded ">
            <Line
              data={{
                labels: stats.labels,
                datasets: [
                  {
                    label: 'Count',
                    data: stats.data,
                    borderColor: '#f47888',
                    backgroundColor: '#f47888',
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
              }}
            />
          </article>
        )}
      </WithQueryData>
    </Container>
  );
  0;
};
