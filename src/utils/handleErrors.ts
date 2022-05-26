import { NextApiResponse } from 'next';
import { HttpException } from '../errors';
import { ResultError, ResultErrorTryInfer } from './result';

export const handleApiError = (res: NextApiResponse, error: unknown) => {
  console.error({ error });
  if (error instanceof HttpException) {
    return res.status(error.code).json(ResultError(error.message));
  }
  return res.status(500).json(ResultErrorTryInfer(error));
};
