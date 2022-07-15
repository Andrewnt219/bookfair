declare module '@bookfair/common' {
  import { Dayjs } from 'dayjs';
  import { z } from 'zod';
  export type TResultError = {
    type: 'error';
    error: HasMessage | Error;
    timestamp: string;
  };

  export type TResultSuccess<Data = unknown> = {
    type: 'success';
    timestamp: string;
    data: Data;
  };

  export type TResult<Data = unknown> = TResultSuccess<Data> | TResultError;

  export type AssertType<T> = (type: unknown) => T;

  export interface Api<Out, In extends z.ZodSchema = z.AnyZodObject> {
    input: z.infer<In>;
    return: TResultSuccess<Out>;
  }

  export type DayjsAble = Date | Dayjs | string;
}
