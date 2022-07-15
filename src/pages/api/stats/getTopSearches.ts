import { Api } from '@bookfair/common';
import dayjs from 'dayjs';
import { z } from 'zod';
import { getTopSearch } from '../../../lib/algolia';
import {
  createAssertSchema,
  ResultSuccess,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';

type Data = {
  labels: string[];
  datasets: {
    label: string;
    backgroundColor: string[];
    borderColor: string[];
    data: number[];
  }[];
};
export type Stats_GetTopSearches = Api<Data, typeof requestSchema>;

const colors = [
  'rgba(54, 162, 235, 0.6)',
  'rgba(255, 206, 86, 0.6)',
  'rgba(75, 192, 192, 0.6)',
  'rgba(153, 102, 255, 0.6)',
  'rgba(255, 159, 64, 0.6)',
];

const DEFAULT_SEARCH_LIMIT = 5;

const requestSchema = z
  .object({
    limit: z.number().optional(),
    startDate: z
      .string()
      .refine((val) => dayjs(val).isValid(), { message: 'Invalid start date' }),
    endDate: z
      .string()
      .refine((val) => dayjs(val).isValid(), { message: 'Invalid end date' }),
  })
  .refine((data) => dayjs(data.startDate).isBefore(data.endDate), {
    message: 'Start date cannot be after end date',
    path: ['startDate'],
  });
const validateRequest =
  createAssertSchema<Stats_GetTopSearches['input']>(requestSchema);

const getHandler: WithApiHandler<Data> = async (req, res) => {
  const query = validateRequest(req.query);
  const searchData = await getTopSearch({
    ...query,
    index: 'listings',
    limit: query.limit ?? DEFAULT_SEARCH_LIMIT,
  });
  const labels = searchData.searches.map((search) => search.search);
  const datasets = [
    {
      label: '',
      data: searchData.searches.map((search) => search.count),
      backgroundColor: colors,
      borderColor: colors,
    },
  ];
  return res.status(200).json(
    ResultSuccess({
      labels,
      datasets,
    })
  );
};

export default withApiHandler({ getHandler });
