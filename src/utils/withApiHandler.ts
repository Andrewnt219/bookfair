import { Result500, ResultError } from "./result";
import { NextApiHandler } from "next";
import { HttpMethod, isHttpMethod } from "./isHttpMethod";
import { TResult } from "@bookfair/common";
import { HttpException } from "../errors";

type ApiHandler = NextApiHandler<TResult>;
type HttpMethodHandlers = Partial<Record<HttpMethod, ApiHandler>>;

export type WithApiHandler<Data> = NextApiHandler<TResult<Data>>;
/**
 * Check if the method of an incoming request is supported by this endpoint
 */
export const withApiHandler = (handlers: HttpMethodHandlers): ApiHandler => {
  return async (req, res) => {
    const method = req.method?.toLowerCase();

    if (!isHttpMethod(method))
      return res.status(400).json(ResultError("Method is missing"));

    const handler = handlers[method];
    if (!handler) {
      return res.status(405).json(ResultError("Method is not allowed"));
    }

    try {
      return await Promise.resolve(handler(req, res));
    } catch (err) {
      console.error(err);
      if (err instanceof HttpException) {
        return res.status(err.code).json(ResultError(err.message));
      }

      return res.status(500).json(Result500());
    }
  };
};
