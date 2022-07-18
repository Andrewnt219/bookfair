import { axios } from '../../../lib/axios';
import { QueryConfig, useTypedQuery } from '../../../lib/react-query';
import { Alert_GetMany } from '../../../pages/api/alert/getMany';
import { useAuthUserStore } from '../../../stores';

const getManyAlerts = async () => {
  const { data } = await axios.get<Alert_GetMany['return']>('/alert/getMany');
  return data.data.alerts;
};

export interface UseGetManyAlertsOptions {
  config?: QueryConfig<typeof getManyAlerts>;
}

export const useGetManyAlerts = (props: UseGetManyAlertsOptions = {}) => {
  const { authUser } = useAuthUserStore();
  return useTypedQuery<typeof getManyAlerts>({
    ...props.config,
    queryFn: () => getManyAlerts(),
    queryKey: ['alerts', authUser?.uid],
    enabled: Boolean(authUser),
  });
};
