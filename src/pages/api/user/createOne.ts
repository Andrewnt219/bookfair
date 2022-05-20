import { FirebaseError } from '@firebase/util';
import { UserRecord } from 'firebase-admin/auth';
import {
  SignupSchema,
  getSignupErrorMessage,
  signupSchema,
} from '../../../modules/auth';
import {
  withApiHandler,
  ResultError,
  ResultSuccess,
  WithApiHandler,
  getErrorMessage,
} from '../../../utils';
import { ValidateBody, TResultSuccess } from '@bookfair/common';
import { SignupService } from '../../../modules/auth/service';

type Data = UserRecord;
export type User_CreateOne_Return = TResultSuccess<Data>;
export type User_CreateOne_Body = SignupSchema;

const validateBody: ValidateBody<User_CreateOne_Body> = async (body) => {
  try {
    const validBody = signupSchema.parse(body);
    return ResultSuccess(validBody);
  } catch (error) {
    console.error({ error });
    return ResultError('Invalid signup values');
  }
};

const post: WithApiHandler<Data> = async (req, res) => {
  const bodyResult = await validateBody(req.body);
  if (bodyResult.type !== 'success') {
    return res.status(422).json(bodyResult);
  }
  try {
    const user = await SignupService.createUser(bodyResult.data);
    return res.status(201).json(ResultSuccess(user));
  } catch (error) {
    console.error({ error });
    return res
      .status(400)
      .json(ResultError(getSignupErrorMessage(error as FirebaseError)));
  }
};

export default withApiHandler({ post });
