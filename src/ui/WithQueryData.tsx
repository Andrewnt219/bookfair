import React, { ReactElement } from 'react';
import { UseQueryResult } from 'react-query';
import { WithData } from './WithData';

export interface WithQueryDataProps<T> {
  query?: UseQueryResult<T>;
  children(data: NonNullable<T>): ReactElement;
}

export function WithQueryData<T>(props: WithQueryDataProps<T>) {
  return (
    <WithData data={props.query?.data} error={props.query?.error}>
      {(data) => props.children(data as NonNullable<T>)}
    </WithData>
  );
}
