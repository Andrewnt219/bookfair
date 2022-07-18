import { Api } from '@bookfair/common';
import { z } from 'zod';
import { alertMiddleware, authMiddleware } from '../../../middlewares';
import { AlertService } from '../../../modules/alert/AlertService';
import {
  createAssertSchema,
  ResultSuccess,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';

type Data = undefined;
export type Alert_DeleteOne = Api<Data, typeof requestSchema>;

const requestSchema = z.object({
  alertId: z.string(),
});
const validateRequest =
  createAssertSchema<Alert_DeleteOne['input']>(requestSchema);

const deleteHandler: WithApiHandler<Data> = async (req, res) => {
  const body = validateRequest(req.body);
  const userId = await authMiddleware(req);
  const alert = await alertMiddleware(userId, body.alertId);
  await AlertService.deleteOne(alert.id);
  return res.status(204).end();
};

export default withApiHandler({ deleteHandler });
