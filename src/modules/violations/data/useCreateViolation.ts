import { axios } from '../../../lib/axios';
import { MutationConfig, useTypedMutation } from '../../../lib/react-query';
import { Violation_CreateOne } from '../../../pages/api/violation/createOne';

const createViolation = async (body: Violation_CreateOne['input']) => {
  const { data } = await axios.post<Violation_CreateOne['return']>(
    '/violation/createOne',
    body
  );
  return data.data.violation;
};

export interface UseCreateViolationOptions {
  config?: MutationConfig<typeof createViolation>;
}

export const useCreateViolation = (props: UseCreateViolationOptions = {}) => {
  return useTypedMutation<typeof createViolation>({
    ...props.config,
    mutationFn: createViolation,
  });
};
