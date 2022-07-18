import { axios } from '../../../lib/axios';
import { QueryConfig, useTypedQuery } from '../../../lib/react-query';
import { Stats_GetUsersListingLimit } from '../../../pages/api/stats/getUsersListingLimit';
import { useAuthUserStore } from '../../../stores';

const getUsersListingLimit = async (
  params: Stats_GetUsersListingLimit['input']
) => {
  const { data } = await axios.get(`/stats/getUsersListingLimit`, {
    params,
  });
  return data.data;
};

export interface UseUsersLListingLimitOptions {
  config?: QueryConfig<typeof getUsersListingLimit>;
  startDate: string;
  endDate: string;
}

export const useUsersListingLimit = (props: UseUsersLListingLimitOptions) => {
  const { authUser } = useAuthUserStore();
  return useTypedQuery<typeof getUsersListingLimit>({
    ...props.config,
    queryFn: () =>
      getUsersListingLimit({
        endDate: props.endDate,
        startDate: props.startDate,
      }),
    queryKey: ['stats-listings-limit', props.startDate, props.endDate],
    enabled: Boolean(props.startDate && props.endDate && authUser),
  });
};
