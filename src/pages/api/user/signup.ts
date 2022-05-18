import { FirebaseError } from '@firebase/util';
import { UserRecord } from 'firebase-admin/auth';
import { adminAuth } from '../../../lib/firebase-admin';
import { SignupSchema, getSignupErrorMessage } from '../../../modules/signup';
import {
  withApiHandler,
  ResultError,
  ResultSuccess,
  WithApiHandler,
} from '../../../utils';

const post: WithApiHandler<UserRecord> = async (req, res) => {
  const body = req.body as SignupSchema;
  try {
    const user = await adminAuth.createUser({ ...body, emailVerified: true });
    return res.status(201).json(ResultSuccess(user));
  } catch (error) {
    console.error({ error });
    return res
      .status(400)
      .json(ResultError(getSignupErrorMessage(error as FirebaseError)));
  }
};

export default withApiHandler({ post });
