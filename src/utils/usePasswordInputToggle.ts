import { useToggle } from './useToggle';

export const usePasswordInputToggle = () => {
  return useToggle(['password', 'text']);
};
