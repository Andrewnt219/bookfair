import { FirebaseError } from '@firebase/util';
import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { firebaseAuth } from '../../../lib/firebase';
import { SignupSchema, getSignupErrorMessage } from '../../../modules/signup';
import {
  withApiHandler,
  ResultError,
  ResultSuccess,
  WithApiHandler,
} from '../../../utils';

const post: WithApiHandler<UserCredential> = async (req, res) => {
  const body = req.body as SignupSchema;
  try {
    const user = await createUserWithEmailAndPassword(
      firebaseAuth,
      body.email,
      body.password
    );
    return res.status(201).json(ResultSuccess(user));
  } catch (error) {
    console.error({ error });
    return res
      .status(400)
      .json(ResultError(getSignupErrorMessage(error as FirebaseError)));
  }
};

export default withApiHandler({ post });
