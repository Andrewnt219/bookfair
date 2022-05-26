declare module '@bookfair/common' {
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

  export type ValidateBody<T> = (body: unknown) => TResult<T>;
}
