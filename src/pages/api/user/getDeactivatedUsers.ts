import { Api } from '@bookfair/common';
import { adminMiddleware } from '../../../middlewares';
import { AuthService } from '../../../modules/auth/service';
import { DbDeactivatedUser } from '../../../modules/user-profile';
import { ResultSuccess, withApiHandler, WithApiHandler } from '../../../utils';

type Data = { users: DbDeactivatedUser[] };
export type User_GetDeactivatedUsers = Api<Data>;

const getHandler: WithApiHandler<Data> = async (req, res) => {
  await adminMiddleware(req);
  const users = await AuthService.getDeactivatedUsers();
  return res.status(200).json(ResultSuccess({ users }));
};

export default withApiHandler({ getHandler });
