import { useSignoutMutation } from './useSignoutMutation';

export const useSignoutButton = () => {
  const signoutMutation = useSignoutMutation();

  return { signoutMutation };
};
