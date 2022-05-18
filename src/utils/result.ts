import { HasMessage } from './validate';

export type TResultError = {
  type: 'error';
  error: HasMessage | Error;
  timestamp: string;
  data: null;
};

export type TResultSuccess<Data = unknown> = {
  type: 'success';
  timestamp: string;
  data: Data;
  error: null;
};

export type TResult<Data = unknown> = TResultSuccess<Data> | TResultError;

export function ResultError(_message: string | string[]): TResultError {
  let message = '';
  if (Array.isArray(_message)) message = _message.join(';');
  else message = _message;

  return {
    type: 'error',
    error: { message },
    timestamp: new Date().toISOString(),
    data: null,
  };
}

export function ResultSuccess<Data = unknown>(
  data: Data
): TResultSuccess<Data> {
  return {
    type: 'success',
    data,
    timestamp: new Date().toISOString(),
    error: null,
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
