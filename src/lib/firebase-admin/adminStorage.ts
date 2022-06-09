import { getStorage } from 'firebase-admin/storage';
import { adminApp } from './adminApp';

export const adminStorage = getStorage(adminApp);
