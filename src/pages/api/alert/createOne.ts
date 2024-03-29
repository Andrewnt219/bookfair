import { Api } from '@bookfair/common';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import { badWords } from '../../../constants';
import { HttpException } from '../../../errors';
import { authMiddleware } from '../../../middlewares';
import { DbAlert } from '../../../modules/alert';
import { AlertService } from '../../../modules/alert/AlertService';
import {
  createAssertSchema,
  ResultSuccess,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';
import { noBadWord } from '../../../utils/zod-utils';

type Data = DbAlert;
export type Alert_CreateOne = Api<Data, typeof requestSchema>;

const requestSchema = z.object({
  search: noBadWord(
    z.string().min(1, { message: 'Search must be at least 1 character' })
  ),
});
const validateRequest =
  createAssertSchema<Alert_CreateOne['input']>(requestSchema);

const postHandler: WithApiHandler<Data> = async (req, res) => {
  const userId = await authMiddleware(req);
  const body = validateRequest(req.body);
  const alerts = await AlertService.getByUserId(userId);
  if (alerts.map((alert) => alert.search).includes(body.search)) {
    throw new HttpException(400, 'Alert already exists');
  }
  const alert: DbAlert = {
    ...body,
    id: nanoid(),
    userId,
    createdAt: dayjs().unix(),
    updatedAt: dayjs().unix(),
    isActive: true,
  };
  await AlertService.createOne(alert);
  return res.status(200).json(ResultSuccess(alert));
};

export default withApiHandler({ postHandler });
