import { sendPasswordResetEmail } from 'firebase/auth';
import { useMutation } from 'react-query';
import { firebaseAuth } from '../../../lib/firebase';
import { MutationConfig } from '../../../lib/react-query';
import { useSnackbar } from 'notistack';
const resetPassword = (email: string) =>
  sendPasswordResetEmail(firebaseAuth, email);
import { getErrorMessage } from '../../../utils';
type TMutationFn = typeof resetPassword;
type TUseResetPasswordOptions = {
  config?: MutationConfig<TMutationFn>;
};

export const useResetPasswordMutation = ({
  config,
}: TUseResetPasswordOptions = {}) => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    ...config,
    mutationFn: resetPassword,
    onSettled: (data, error) => {
      if (error) {
        console.error({ error });
        enqueueSnackbar(getErrorMessage(error), { variant: 'error' });
        return;
      }
    },
  });
};
