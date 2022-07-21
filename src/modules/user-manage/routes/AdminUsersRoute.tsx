import React from 'react';
import { WithQueryData } from '../../../ui';
import { ActivatedUserList } from '../components/ActivatedUserList';
import { DeactivatedUserList } from '../components/DeactivatedUserList';
import { useGetActivatedUsers } from '../data/useGetActivatedUsers';
import { useGetDeactivatedUsers } from '../data/useGetDeactivatedUsers';

export const AdminUsersRoute = () => {
  const activatedUsersQuery = useGetActivatedUsers();
  const deactivatedUsersQuery = useGetDeactivatedUsers();

  return (
    <section>
      <h1>Manage users</h1>

      <article className="p-3 shadow-sm rounded mt-3">
        <h2 className="h3">Activated users</h2>
        <WithQueryData query={activatedUsersQuery}>
          {(users) => <ActivatedUserList users={users} />}
        </WithQueryData>
      </article>

      <article className="p-3 shadow-sm rounded mt-3">
        <h2 className="h3">Deactivated users</h2>
        <WithQueryData query={deactivatedUsersQuery}>
          {(users) => <DeactivatedUserList users={users} />}
        </WithQueryData>
      </article>
    </section>
  );
};
