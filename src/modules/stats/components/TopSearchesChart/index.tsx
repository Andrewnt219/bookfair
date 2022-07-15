import React from 'react';
import { WithQueryData } from '../../../../ui';
import { useTopSearchesStats } from '../../data/useTopSearchesStats';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { DayjsAble } from '@bookfair/common';
import dayjs from 'dayjs';
export interface TopSearchesChartProps {
  startDate: DayjsAble;
  endDate: DayjsAble;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const TopSearchesChart = (props: TopSearchesChartProps) => {
  const statsQuery = useTopSearchesStats({
    endDate: dayjs(props.endDate).format('YYYY-MM-DD'),
    startDate: dayjs(props.startDate).format('YYYY-MM-DD'),
  });

  return (
    <article>
      <WithQueryData query={statsQuery}>
        {(stats) => (
          <Bar
            data={{
              labels: stats.labels,
              datasets: stats.dataset,
            }}
          />
        )}
      </WithQueryData>
    </article>
  );
};
