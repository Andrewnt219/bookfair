import { NextApiRequest } from 'next';
import { HttpException } from '../errors';
import { adminAuth } from '../lib/firebase-admin';
import { getBearerToken } from '../utils';

export const authMiddleware = async (req: NextApiRequest): Promise<string> => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new HttpException(400, 'Missing authentication header');
  }
  const idToken = getBearerToken(authorization);
  if (!idToken) {
    throw new HttpException(401, 'Not authenticated');
  }

  try {
    const authUser = await adminAuth.verifyIdToken(idToken);
    return authUser.uid;
  } catch (error) {
    throw new HttpException(401, 'Not authenticated');
  }
};
