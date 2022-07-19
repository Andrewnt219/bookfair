import { Api } from '@bookfair/common';
import { z } from 'zod';
import { HttpException } from '../../../errors';
import { adminMiddleware } from '../../../middlewares';
import { ExpandedDbViolation } from '../../../modules/violations';
import { ViolationService } from '../../../modules/violations/violation-services';
import {
  createAssertSchema,
  ResultSuccess,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';

type Data = { violation: ExpandedDbViolation };
export type Violation_GetExpanded = Api<Data, typeof requestSchema>;

const requestSchema = z.object({
  violationId: z.string(),
});
const validateRequest =
  createAssertSchema<Violation_GetExpanded['input']>(requestSchema);

const getHandler: WithApiHandler<Data> = async (req, res) => {
  await adminMiddleware(req);
  const query = validateRequest(req.query);
  const violation = await ViolationService.getExpanded(query.violationId);
  if (!violation) {
    throw new HttpException(404, 'Violation not found');
  }
  return res.status(200).json(ResultSuccess({ violation }));
};

export default withApiHandler({ getHandler });
