import dayjs from 'dayjs';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useQueryClient } from 'react-query';
import { useToastStore } from '../../../stores';
import { WithQueryData } from '../../../ui';
import { DbDeactivatedUser, useDbUserQuery } from '../../user-profile';
import { useActivateUser } from '../data/useActivateUser';

export interface DeactivatedUserListItemProps {
  user: DbDeactivatedUser;
}

export const DeactivatedUserListItem = (
  props: DeactivatedUserListItemProps
) => {
  const adminQuery = useDbUserQuery(props.user.suspension.adminId);
  const qc = useQueryClient();
  const toast = useToastStore();
  const activateUser = useActivateUser({
    config: {
      onError(error) {
        toast.error(error);
      },
      onSuccess() {
        qc.invalidateQueries('users');
        toast.success('User has been activated');
      },
    },
  });

  const onActivateClick = () =>
    activateUser.mutate({
      userId: props.user.uid,
    });

  return (
    <article>
      <h3 className="h4">{props.user.displayName}</h3>
      <WithQueryData query={adminQuery}>
        {(admin) => (
          <div>
            <p>
              <time
                dateTime={dayjs
                  .unix(props.user.suspension.createdAt)
                  .toISOString()}
              >
                Disabled on{' '}
                {dayjs
                  .unix(props.user.suspension.createdAt)
                  .format('MMM DD, YYYY')}{' '}
              </time>
              by <a href={`mailto:${admin.email}`}>{admin.displayName}</a>
            </p>

            <p>Reason: {props.user.suspension.reason}</p>
          </div>
        )}
      </WithQueryData>
      <Button
        disabled={activateUser.isLoading}
        variant="primary"
        size="sm"
        onClick={onActivateClick}
      >
        Activate
      </Button>
    </article>
  );
};
