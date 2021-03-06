import { ResultError } from './result';
import { NextApiHandler } from 'next';
import { HttpMethod, isHttpMethod } from './isHttpMethod';
import { TResult } from '@bookfair/common';
import { handleApiError } from './handleErrors';

type ApiHandler = NextApiHandler<TResult>;
type HttpMethodHandlers = Partial<Record<`${HttpMethod}Handler`, ApiHandler>>;

export type WithApiHandler<Data> = NextApiHandler<TResult<Data>>;
/**
 * Check if the method of an incoming request is supported by this endpoint
 */
export const withApiHandler = (handlers: HttpMethodHandlers): ApiHandler => {
  return async (req, res) => {
    const method = req.method?.toLowerCase();

    if (!isHttpMethod(method))
      return res.status(400).json(ResultError('Method is missing'));

    const handler = handlers[`${method}Handler`];
    if (!handler) {
      return res.status(405).json(ResultError('Method is not allowed'));
    }

    try {
      return await Promise.resolve(handler(req, res));
    } catch (err) {
      return handleApiError(res, err);
    }
  };
};
