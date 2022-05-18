import { NextApiRequest } from 'next';
import { HttpException } from '../errors';
import { adminAuth } from '../lib/firebase-admin';

export const authMiddleware = async (req: NextApiRequest) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new HttpException(401, 'Not authenticated');
  }

  const idToken = authorization.split(' ')[1];
  try {
    await adminAuth.verifyIdToken(idToken);
    return req;
  } catch (error) {
    throw new HttpException(401, 'Not authenticated');
  }
};
