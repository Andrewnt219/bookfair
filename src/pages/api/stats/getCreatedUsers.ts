import { Api } from '@bookfair/common';
import dayjs from 'dayjs';
import groupBy from 'lodash/groupBy';
import { z } from 'zod';
import { colors } from '../../../constants';
import { AuthService } from '../../../modules/auth/service';
import {
  createAssertSchema,
  ResultSuccess,
  WithApiHandler,
  withApiHandler,
} from '../../../utils';

type Data = {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string;
    borderColor: string;
    label: string;
  }[];
};
export type Stats_GetCreatedUsers = Api<Data, typeof requestSchema>;

const requestSchema = z
  .object({
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
  createAssertSchema<Stats_GetCreatedUsers['input']>(requestSchema);

const getHandler: WithApiHandler<Data> = async (req, res) => {
  const query = validateRequest(req.query);
  const users = await AuthService.getUsersBetweenDates(
    dayjs(query.startDate).unix(),
    dayjs(query.endDate).unix()
  );
  const groupedUsers = groupBy(users, (user) =>
    dayjs.unix(user.createdDate).format('MM/YYYY')
  );
  const labels = Object.keys(groupedUsers);
  const data = Object.values(groupedUsers).map((users) => users.length);
  const datasets = [
    {
      label: 'Created users',
      data,
      backgroundColor: colors.chart.red,
      borderColor: colors.chart.red,
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
