import { Api } from '@bookfair/common';
import { authMiddleware } from '../../../middlewares';
import { DbAlert } from '../../../modules/alert';
import { AlertService } from '../../../modules/alert/AlertService';
import { ResultSuccess, WithApiHandler, withApiHandler } from '../../../utils';

type Data = { alerts: DbAlert[] };
export type Alert_GetMany = Api<Data>;

const getHandler: WithApiHandler<Data> = async (req, res) => {
  const userId = await authMiddleware(req);
  const alerts = await AlertService.getByUserId(userId);
  return res.status(200).json(ResultSuccess({ alerts }));
};

export default withApiHandler({ getHandler });
