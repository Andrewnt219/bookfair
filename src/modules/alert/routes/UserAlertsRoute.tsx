import React from 'react';
import { Container } from 'react-bootstrap';
import { BackButton, WithQueryData } from '../../../ui';
import { useGetManyAlerts } from '../api/useGetManyAlerts';
import { AlertList } from '../components/AlertList';

export const UserAlertsRoute = () => {
  const alertsQuery = useGetManyAlerts();

  return (
    <section>
      <h1 className="mt-3">Alerts</h1>

      <WithQueryData query={alertsQuery}>
        {(alerts) => <AlertList alerts={alerts} />}
      </WithQueryData>
    </section>
  );
};
