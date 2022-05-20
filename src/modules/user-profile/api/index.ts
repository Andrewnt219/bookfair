import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes } from 'firebase/storage';
import { ToastException } from '../../../errors';
import { firebaseAuth } from '../../../lib/firebase';
import { firebaseStorage } from '../../../lib/firebase/storage';
import { getErrorMessage } from '../../../utils';

export class UserProfileApi {
  static async postAvatar(file: File | Blob) {
    const { currentUser } = firebaseAuth;
    if (!currentUser)
      throw new ToastException('Fail to update avatar. Try login in again');

    const storageRef = this.getStorageRef(
      this.getStoragePathToAvatar(currentUser.uid)
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
  }

  //#region Helpers
  private static getStoragePathToAvatar(userId: string) {
    return `${userId}/images/avatar`;
  }

  private static getStorageRef = (path: string) => ref(firebaseStorage, path);

  //#endregion
}
