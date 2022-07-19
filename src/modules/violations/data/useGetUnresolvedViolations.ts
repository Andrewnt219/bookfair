import { axios } from '../../../lib/axios';
import { QueryConfig, useTypedQuery } from '../../../lib/react-query';
import { Violation_GetUnresolved } from '../../../pages/api/violation/getUnresolved';
import { useAuthUserStore } from '../../../stores';

const getUnresolvedViolations = async () => {
  const { data } = await axios.get<Violation_GetUnresolved['return']>(
    '/violation/getUnresolved'
  );
  return data.data.violations;
};

export interface UseGetUnresolvedViolationsOptions {
  config?: QueryConfig<typeof getUnresolvedViolations>;
}

export const useGetUnresolvedViolations = (
  props: UseGetUnresolvedViolationsOptions = {}
) => {
  const { authUser } = useAuthUserStore();
  return useTypedQuery<typeof getUnresolvedViolations>({
    ...props.config,
    queryKey: ['violations', { type: 'pending' }],
    queryFn: () => getUnresolvedViolations(),
    enabled: Boolean(authUser),
  });
};
