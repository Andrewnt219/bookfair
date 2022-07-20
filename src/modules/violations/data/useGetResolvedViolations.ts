import { axios } from '../../../lib/axios';
import { QueryConfig, useTypedQuery } from '../../../lib/react-query';
import { Violation_GetResolved } from '../../../pages/api/violation/getResolved';
import { useAuthUserStore } from '../../../stores';

const getResolvedViolations = async () => {
  const { data } = await axios.get<Violation_GetResolved['return']>(
    '/violation/getResolved'
  );
  return data.data.violations;
};

export interface UseGetResolvedViolationsOptions {
  config?: QueryConfig<typeof getResolvedViolations>;
}

export const useGetResolvedViolations = (
  props: UseGetResolvedViolationsOptions = {}
) => {
  const { authUser } = useAuthUserStore();
  return useTypedQuery<typeof getResolvedViolations>({
    ...props.config,
    queryKey: ['violations'],
    queryFn: () => getResolvedViolations(),
    enabled: Boolean(authUser),
  });
};
