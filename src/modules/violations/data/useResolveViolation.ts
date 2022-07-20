import { axios } from '../../../lib/axios';
import { MutationConfig, useTypedMutation } from '../../../lib/react-query';
import { Violation_ResolveOne } from '../../../pages/api/violation/resolveOne';

const resolveViolation = async (body: Violation_ResolveOne['input']) => {
  await axios.patch<Violation_ResolveOne['return']>(
    '/violation/resolveOne',
    body
  );
};

export interface UseResolveViolationOptions {
  config?: MutationConfig<typeof resolveViolation>;
}

export const useResolveViolation = (props: UseResolveViolationOptions = {}) => {
  return useTypedMutation<typeof resolveViolation>({
    ...props.config,
    mutationFn: resolveViolation,
  });
};
