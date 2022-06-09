import { TResultSuccess } from '@bookfair/common';
import { authMiddleware } from '../../../middlewares';
import { AuthService } from '../../../modules/auth/service';
import {
  HasMessage,
  ResultOk,
  WithApiHandler,
  withApiHandler,
} from '../../../utils';

type Data = HasMessage;
export type User_DeleteOne_Return = TResultSuccess<Data>;

const deleteHandler: WithApiHandler<Data> = async (req, res) => {
  const userId = await authMiddleware(req);
  await AuthService.deleteUser(userId);
  return res.status(200).json(ResultOk());
};

export default withApiHandler({ deleteHandler });
