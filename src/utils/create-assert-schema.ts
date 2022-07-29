import { z } from 'zod';
import { HttpException } from '../errors';

export const createAssertSchema = <T>(schema: z.Schema) =>
  function (body: unknown): T {
    try {
      return schema.parse(body);
    } catch (zodErrors) {
      const { issues } = zodErrors as z.ZodError;
      const messages = issues.map((error) => error.message);
      throw new HttpException(422, messages.join('. '));
    }
  };
