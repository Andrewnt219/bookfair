import { axios } from '../../../lib/axios';
import { MutationConfig, useTypedMutation } from '../../../lib/react-query';
import { User_CreateMessage } from '../../../pages/api/user/createMessage';

const createMessage = async (body: User_CreateMessage['input']) => {
  await axios.post<User_CreateMessage['return']>('/user/createMessage', body);
};

export interface UseCreateMessageOptions {
  config?: MutationConfig<typeof createMessage>;
}

export const useCreateMessage = (props: UseCreateMessageOptions = {}) => {
  return useTypedMutation<typeof createMessage>({
    ...props.config,
    mutationFn: createMessage,
  });
};
