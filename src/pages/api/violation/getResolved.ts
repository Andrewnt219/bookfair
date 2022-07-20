import { Api } from '@bookfair/common';
import { adminMiddleware } from '../../../middlewares';
import { DbViolation } from '../../../modules/violations';
import { ViolationService } from '../../../modules/violations/violation-services';
import { ResultSuccess, withApiHandler, WithApiHandler } from '../../../utils';

type Data = { violations: DbViolation[] };
export type Violation_GetResolved = Api<Data>;

const getHandler: WithApiHandler<Data> = async (req, res) => {
  await adminMiddleware(req);
  const violations = await ViolationService.getManyResolved();
  return res.status(200).json(ResultSuccess({ violations }));
};

export default withApiHandler({ getHandler });
