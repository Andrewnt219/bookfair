import React from 'react';
import { WithQueryData } from '../../../ui';
import { ViolationList } from '../components/ViolationList';
import { useGetResolvedViolations } from '../data/useGetResolvedViolations';
import { useGetUnresolvedViolations } from '../data/useGetUnresolvedViolations';

export const AdminViolationRoute = () => {
  const unresolvedViolationsQuery = useGetUnresolvedViolations();
  const resolvedViolationsQuery = useGetResolvedViolations();

  return (
    <section>
      <h1>Violations</h1>

      <article className="p-3 shadow-sm rounded">
        <h3>Pending</h3>
        <WithQueryData query={unresolvedViolationsQuery}>
          {(violations) => <ViolationList violations={violations} />}
        </WithQueryData>
      </article>

      <article className="p-3 shadow-sm rounded mt-3">
        <h3>Resolved</h3>
        <WithQueryData query={resolvedViolationsQuery}>
          {(violations) => <ViolationList violations={violations} />}
        </WithQueryData>
      </article>
    </section>
  );
};
