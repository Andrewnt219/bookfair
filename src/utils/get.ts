import { isBrowser } from '@firebase/util';
import axios, { AxiosError } from 'axios';
import { TResultError } from './result';
import { hasMessage, isFirebaseError, isNullOrUndefined } from './validate';

export function getAxiosError(error: AxiosError<TResultError>): string {
  if (error.response?.data.error) return error.response.data.error.message;

  if (error.request) return 'Network problem';

  return 'Something went wrong';
}

export function getErrorMessage(error: unknown): string {
  if (isFirebaseError(error)) return error.message;

  if (isBrowser() && !isNullOrUndefined(error) && axios.isAxiosError(error))
    return getAxiosError(error as AxiosError<TResultError>);

  if (hasMessage(error)) return error.message;

  if (typeof error === 'string') return error;

  return 'Something went wrong';
}
