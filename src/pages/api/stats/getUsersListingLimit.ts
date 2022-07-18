import { Api } from '@bookfair/common';
import dayjs from 'dayjs';
import { z } from 'zod';
import { adminMiddleware } from '../../../middlewares';
import { AuthService } from '../../../modules/auth/service';
import {
  createAssertSchema,
  ResultSuccess,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';
import groupBy from 'lodash/groupBy';
import { colors } from '../../../constants';

type Data = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
  }[];
};
export type Stats_GetUsersListingLimit = Api<Data, typeof requestSchema>;

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
  createAssertSchema<Stats_GetUsersListingLimit['input']>(requestSchema);

const bgColors = [colors.chart.red, colors.chart.green, colors.chart.blue];

const getHandler: WithApiHandler<Data> = async (req, res) => {
  await adminMiddleware(req);
  const query = validateRequest(req.query);
  const users = await AuthService.getUsersBetweenDates(
    dayjs(query.startDate).unix(),
    dayjs(query.endDate).unix()
  );
  const groupedByListingLimit = groupBy(users, (user) => {
    if (user.listingLimit <= 2) {
      return `No slot purchased`;
    }
    if (user.listingLimit <= 5) {
      return `Purchased 3-5 slots`;
    }
    return `Purchased more than 5 slots`;
  });
  const labels = Object.keys(groupedByListingLimit);
  const data = Object.values(groupedByListingLimit).map(
    (group) => group.length
  );
  const datasets = [
    {
      label: 'Listing Limit',
      data,
      backgroundColor: bgColors,
      borderColor: bgColors,
    },
  ];
  return res.status(200).json(ResultSuccess({ labels, datasets }));
};

export default withApiHandler({ getHandler });
