import { axios } from '../../../lib/axios';
import { MutationConfig, useTypedMutation } from '../../../lib/react-query';
import { User_ActivateOne } from '../../../pages/api/user/activateOne';

const activateUser = async (body: User_ActivateOne['input']) => {
  await axios.patch('/user/activateOne', body);
};

export interface UseActivateUserOptions {
  config?: MutationConfig<typeof activateUser>;
}

export const useActivateUser = (props: UseActivateUserOptions = {}) => {
  return useTypedMutation<typeof activateUser>({
    ...props.config,
    mutationFn: activateUser,
  });
};
