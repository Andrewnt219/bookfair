declare module '@bookfair/common' {
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

  export type ValidateBody<T = {}> = (
    body: any
  ) => TResult<T> | Promise<TResult<T>>;
}
