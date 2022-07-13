import { NextApiRequest } from 'next';
import { HttpException } from '../errors';
import { AuthService } from '../modules/auth/service';
import { DbUser } from '../modules/user-profile';
import { authMiddleware } from './authMiddleware';

export const adminMiddleware = async (req: NextApiRequest): Promise<DbUser> => {
  const userId = await authMiddleware(req);
  const user = await AuthService.getUser(userId);
  if (!user) throw new HttpException(401, 'User is not logged in');
  if (!user.role) throw new HttpException(403, 'User is not an admin');
  return user;
};
