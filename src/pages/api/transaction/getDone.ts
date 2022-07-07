import { Api } from '@bookfair/common';
import { authMiddleware } from '../../../middlewares';
import { DbTransaction } from '../../../modules/listing';
import { TransactionService } from '../../../modules/listing/TransactionService';
import { ResultSuccess, withApiHandler, WithApiHandler } from '../../../utils';

type Data = DbTransaction[];
export type Transaction_GetDone = Api<Data>;

const getHandler: WithApiHandler<Data> = async (req, res) => {
  const buyerId = await authMiddleware(req);
  const transactions = (
    await TransactionService.getManyByBuyer(buyerId)
  ).filter((t) => !t.isPending);
  return res.status(200).json(ResultSuccess(transactions));
};

export default withApiHandler({ getHandler });
