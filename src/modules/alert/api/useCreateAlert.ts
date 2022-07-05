import { axios } from '../../../lib/axios';
import { MutationConfig, useTypedMutation } from '../../../lib/react-query';
import { Alert_CreateOne } from '../../../pages/api/alert/createOne';

const createAlert = async (body: Alert_CreateOne['input']) => {
  const { data } = await axios.post<Alert_CreateOne['return']>(
    '/alert/createOne',
    body
  );
  return data.data;
};

export interface UseCreateAlertOptions {
  config?: MutationConfig<typeof createAlert>;
}

export const useCreateAlert = (props: UseCreateAlertOptions = {}) => {
  return useTypedMutation<typeof createAlert>({
    ...props.config,
    mutationFn: createAlert,
  });
};
