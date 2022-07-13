import React, { ReactElement } from 'react';
import { Spinner } from 'react-bootstrap';
import { useToastStore } from '../stores';
import { getErrorMessage } from '../utils';

export interface WithDataProps<T> {
  className?: string;
  data: T | undefined | null;
  error: unknown;
  children(data: NonNullable<T>): ReactElement;
}

export function WithData<T>(props: WithDataProps<T>) {
  const toastStore = useToastStore();

  if (props.error) {
    toastStore.error(props.error);
    return <p>{getErrorMessage(props.error)}</p>;
  }

  if (!props.data) {
    return (
      <Spinner size="sm" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return props.children(props.data as NonNullable<T>);
}
