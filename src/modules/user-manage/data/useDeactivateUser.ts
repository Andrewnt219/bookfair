import { axios } from '../../../lib/axios';
import { MutationConfig, useTypedMutation } from '../../../lib/react-query';
import { User_DeactivateOne } from '../../../pages/api/user/deactivateOne';

const deactivateUser = async (body: User_DeactivateOne['input']) => {
  await axios.patch('/user/deactivateOne', body);
};

export interface UseDeactivateUserOptions {
  config?: MutationConfig<typeof deactivateUser>;
}

export const useDeactivateUser = (props: UseDeactivateUserOptions = {}) => {
  return useTypedMutation<typeof deactivateUser>({
    ...props.config,
    mutationFn: deactivateUser,
  });
};
