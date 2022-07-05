import { db } from '../../lib/firebase-admin';
import { DbAlert } from './types';

export class AlertService {
  static createOne(data: DbAlert) {
    return db.alerts.doc(data.id).set(data);
  }
}
