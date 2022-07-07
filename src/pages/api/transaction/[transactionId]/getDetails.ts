import { Api } from '@bookfair/common';
import { z } from 'zod';
import { authMiddleware } from '../../../../middlewares';
import { ExpandedDbTransaction } from '../../../../modules/listing';
import { TransactionService } from '../../../../modules/listing/TransactionService';
import {
  createAssertSchema,
  ResultSuccess,
  withApiHandler,
  WithApiHandler,
} from '../../../../utils';

type Data = ExpandedDbTransaction;
export type Transaction_Id_GetDetails = Api<Data, typeof requestSchema>;

const requestSchema = z.object({
  transactionId: z.string(),
});
const validateRequest =
  createAssertSchema<Transaction_Id_GetDetails['input']>(requestSchema);

const getHandler: WithApiHandler<Data> = async (req, res) => {
  const query = validateRequest(req.query);
  const userId = await authMiddleware(req);

  const expandedTransaction = await TransactionService.getExpanded(
    query.transactionId,
    userId
  );

  return res.status(200).json(ResultSuccess(expandedTransaction));
};

export default withApiHandler({ getHandler });
