import { Api } from '@bookfair/common';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import { DbAlert } from '../../../modules/alert';
import { AlertService } from '../../../modules/alert/AlertService';
import {
  createAssertSchema,
  ResultSuccess,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';

type Data = DbAlert;
export type Alert_CreateOne = Api<Data, typeof requestSchema>;

const requestSchema = z.object({
  search: z.string().min(1, { message: 'Search must be at least 1 character' }),
  userEmail: z.string().email(),
});
const validateRequest =
  createAssertSchema<Alert_CreateOne['input']>(requestSchema);

const postHandler: WithApiHandler<Data> = async (req, res) => {
  const body = validateRequest(req.body);
  const alert: DbAlert = {
    ...body,
    id: nanoid(),
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
  };
  await AlertService.createOne(alert);
  return res.status(200).json(ResultSuccess(alert));
};

export default withApiHandler({ postHandler });
