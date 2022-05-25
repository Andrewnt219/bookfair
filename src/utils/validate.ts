import { FirebaseError } from "@firebase/util";

export type HasMessage = { message: string };

// this will always work with any types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const hasMessage = (obj: any): obj is HasMessage =>
  typeof obj?.message === "string";
export const isNullOrUndefined = (obj: unknown): obj is null | undefined =>
  obj === null || obj === undefined;

export const notEmpty = <T>(obj: T | null | undefined): obj is T =>
  !isNullOrUndefined(obj);

export const isEmptyString = (str: string | null | undefined): boolean =>
  isNullOrUndefined(str) || str.trim().length === 0;

// this will always work with any types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const hasName = (obj: any): obj is { name: string } =>
  typeof obj?.name === "string";

export const isFirebaseError = (error: unknown): error is FirebaseError =>
  hasName(error) && error.name === "FirebaseError";
