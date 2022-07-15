import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useListingsPriceStats } from '../../data/useListingsPriceStats';
import { DayjsAble } from '@bookfair/common';
import { WithQueryData } from '../../../../ui';
import { Pie } from 'react-chartjs-2';

export interface ListingsPriceChartProps {
  startDate: DayjsAble;
  endDate: DayjsAble;
}

ChartJS.register(ArcElement, Tooltip, Legend);

export const ListingsPriceChart = (props: ListingsPriceChartProps) => {
  const statsQuery = useListingsPriceStats({
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
