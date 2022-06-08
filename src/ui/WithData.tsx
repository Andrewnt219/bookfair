import React, { ReactElement } from 'react';
import { getErrorMessage } from '../utils';

export interface WithDataProps<T> {
  className?: string;
  data: T | undefined | null;
  error: unknown;
  children(data: NonNullable<T>): ReactElement;
}

export function WithData<T>(props: WithDataProps<T>) {
  if (props.error) {
    return <p>{getErrorMessage(props.error)}</p>;
  }

  if (!props.data) {
    return <p>...</p>;
  }

  return props.children(props.data as NonNullable<T>);
}
