import { TResultError, TResultSuccess } from '@bookfair/common';
import { getErrorMessage } from './get';
import { HasMessage } from './validate';

export function ResultError(_message: string | string[]): TResultError {
  let message = '';
  if (Array.isArray(_message)) message = _message.join(';');
  else message = _message;

  return {
    type: 'error',
    error: { message },
    timestamp: new Date().toISOString(),
  };
}

export function ResultErrorTryInfer(error: unknown): TResultError {
  return ResultError(getErrorMessage(error));
}

export function ResultSuccess<Data = unknown>(
  data: Data
): TResultSuccess<Data> {
  return {
    type: 'success',
    data,
    timestamp: new Date().toISOString(),
  };
}

export function ResultOk(): TResultSuccess<HasMessage> {
  return ResultSuccess({ message: 'Ok' });
}

export function ResultNotFound(): TResultError {
  return ResultError('Not found');
}

export function Result500(): TResultError {
  return ResultError('Something went wrong');
}
