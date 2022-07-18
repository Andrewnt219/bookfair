import { axios } from '../../../lib/axios';
import { MutationConfig, useTypedMutation } from '../../../lib/react-query';
import { Alert_DeleteOne } from '../../../pages/api/alert/deleteOne';

const deleteAlert = async (body: Alert_DeleteOne['input']) => {
  await axios.delete<Alert_DeleteOne['return']>('/alert/deleteOne', {
    data: body,
  });
};

export interface UseDeleteAlertOptions {
  config?: MutationConfig<typeof deleteAlert>;
}

export const useDeleteAlert = (props: UseDeleteAlertOptions = {}) => {
  return useTypedMutation<typeof deleteAlert>({
    ...props.config,
    mutationFn: deleteAlert,
  });
};
