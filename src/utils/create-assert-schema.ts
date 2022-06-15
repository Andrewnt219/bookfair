import { z } from 'zod';
import { HttpException } from '../errors';
import { getErrorMessage } from './get';

export const createAssertSchema = <T>(schema: z.Schema) =>
  function (body: unknown): T {
    try {
      return schema.parse(body);
    } catch (error) {
      throw new HttpException(422, getErrorMessage(error));
    }
  };
