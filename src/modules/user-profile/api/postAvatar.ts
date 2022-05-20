import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes } from 'firebase/storage';
import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';
import { ToastException } from '../../../errors';
import { firebaseAuth } from '../../../lib/firebase';
import { firebaseStorage } from '../../../lib/firebase/storage';
import { MutationConfig } from '../../../lib/react-query';
import { getErrorMessage } from '../../../utils';

const getStoragePathToAvatar = (userId: string) => `${userId}/images/avatar`;

const postAvatar = async (file: File | Blob) => {
  const { currentUser } = firebaseAuth;
  if (!currentUser)
    throw new ToastException('Fail to update avatar. Try login in again');

  const storageRef = ref(
    firebaseStorage,
    getStoragePathToAvatar(currentUser.uid)
  );

  try {
    const uploadResult = await uploadBytes(storageRef, file);
    await updateProfile(currentUser, {
      photoURL: uploadResult.metadata.fullPath,
    });
  } catch (error) {
    console.error({ error });
    throw new ToastException(
      'Fail to update avatar: ' + getErrorMessage(error)
    );
  }
};

type MutationFnType = typeof postAvatar;
interface UsePostAvatarOptions {
  config?: MutationConfig<MutationFnType>;
}

export const usePostAvatarMutation = ({
  config,
}: UsePostAvatarOptions = {}) => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    ...config,
    onError: (error) => {
      enqueueSnackbar(getErrorMessage(error), { variant: 'error' });
    },
    onSuccess: () => {
      enqueueSnackbar('Successfully updated avatar', { variant: 'success' });
    },
    mutationFn: postAvatar,
  });
};
