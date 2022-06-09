import { TResultSuccess } from '@bookfair/common';
import { authMiddleware } from '../../../middlewares';
import { ResultSuccess, withApiHandler, WithApiHandler } from '../../../utils';

type Data = [];
export type Listing_GetByUser_Return = TResultSuccess<Data>;

const getHandler: WithApiHandler<Data> = async (req, res) => {
  await authMiddleware(req);
  return res.status(200).json(ResultSuccess([]));
};

export default withApiHandler({ getHandler });
