import { DayjsAble } from '@bookfair/common';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { WithQueryData } from '../../../../ui';
import { useCreatedListingsStats } from '../../data/useCreatedListingsStats';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
export interface CreatedListingsChartProps {
  startDate: DayjsAble;
  endDate: DayjsAble;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const CreatedListingsChart = (props: CreatedListingsChartProps) => {
  const statsQuery = useCreatedListingsStats({
    endDate: props.endDate.toString(),
    startDate: props.startDate.toString(),
  });

  return (
    <article>
      <WithQueryData query={statsQuery}>
        {(stats) => (
          <Line
            data={{
              labels: stats.labels,
              datasets: stats.datasets,
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
        )}
      </WithQueryData>
    </article>
  );
};
