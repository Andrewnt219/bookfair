import { HttpException } from '../errors';
import { DbAlert } from '../modules/alert';
import { AlertService } from '../modules/alert/AlertService';

export const alertMiddleware = async (
  userId: string,
  alertId: string
): Promise<DbAlert> => {
  const alert = await AlertService.getOne(alertId);
  if (!alert) throw new HttpException(404, 'Alert not found');
  if (alert.userId !== userId) {
    throw new HttpException(401, 'Listing does not belong to user');
  }
  return alert;
};
