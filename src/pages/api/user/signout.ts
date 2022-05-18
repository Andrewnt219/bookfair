import { TResultSuccess } from '@bookfair/common';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../../../lib/firebase';
import {
  getErrorMessage,
  HasMessage,
  ResultError,
  ResultOk,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';

type Data = HasMessage;
export type User_Signout_Return = TResultSuccess<Data>;

const post: WithApiHandler<Data> = async (req, res) => {
  try {
    await signOut(firebaseAuth);
    return res.status(200).json(ResultOk());
  } catch (error) {
    return res.status(400).json(ResultError(getErrorMessage(error)));
  }
};

export default withApiHandler({ post });
