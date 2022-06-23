import { useDialog } from '../../../../utils';

export const usePromoteListingButton = () => {
  const dialog = useDialog();
  return { dialog };
};
