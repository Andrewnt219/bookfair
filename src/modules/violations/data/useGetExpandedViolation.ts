import { axios } from '../../../lib/axios';
import { QueryConfig, useTypedQuery } from '../../../lib/react-query';
import { Violation_GetExpanded } from '../../../pages/api/violation/getExpanded';
import { useAuthUserStore } from '../../../stores';

const getExpandedViolation = async (params: Violation_GetExpanded['input']) => {
  const { data } = await axios.get<Violation_GetExpanded['return']>(
    '/violation/getExpanded',
    { params }
  );
  return data.data.violation;
};

export interface UseGetExpandedViolationOptions {
  config?: QueryConfig<typeof getExpandedViolation>;
  violationId: string | undefined;
}

export const useGetExpandedViolation = (
  props: UseGetExpandedViolationOptions
) => {
  const { authUser } = useAuthUserStore();
  return useTypedQuery<typeof getExpandedViolation>({
    ...props.config,
    queryKey: ['violation', props.violationId],
    // Only runs when violationId is exist
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => getExpandedViolation({ violationId: props.violationId! }),
    enabled: Boolean(authUser && props.violationId),
  });
};
