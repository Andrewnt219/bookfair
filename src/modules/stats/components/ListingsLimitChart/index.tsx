import { DayjsAble } from '@bookfair/common';
import { Chart, ArcElement, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { WithQueryData } from '../../../../ui';
import { useUsersListingLimit } from '../../data/useUsersListingLimit';

export interface ListingsLimitChartProps {
  startDate: DayjsAble;
  endDate: DayjsAble;
}

Chart.register(ArcElement, Tooltip, Legend);

export const ListingsLimitChart = (props: ListingsLimitChartProps) => {
  const statsQuery = useUsersListingLimit({
    endDate: props.endDate.toString(),
    startDate: props.startDate.toString(),
  });
  return (
    <article>
      <WithQueryData query={statsQuery}>
        {(stats) => (
          <Pie data={{ datasets: stats.datasets, labels: stats.labels }} />
        )}
      </WithQueryData>
    </article>
  );
};
