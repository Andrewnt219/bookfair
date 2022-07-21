import { Api } from '@bookfair/common';
import { adminMiddleware } from '../../../middlewares';
import { AuthService } from '../../../modules/auth/service';
import { DbUser } from '../../../modules/user-profile';
import { ResultSuccess, withApiHandler, WithApiHandler } from '../../../utils';

type Data = { users: DbUser[] };
export type User_GetActivatedUsers = Api<Data>;

const getHandler: WithApiHandler<Data> = async (req, res) => {
  await adminMiddleware(req);
  const users = await AuthService.getActivatedUsers();
  return res.status(200).json(ResultSuccess({ users }));
};

export default withApiHandler({ getHandler });
