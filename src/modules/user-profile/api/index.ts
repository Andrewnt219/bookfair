import { User } from 'firebase/auth';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  UploadResult,
} from 'firebase/storage';
import { ToastException } from '../../../errors';
import { axios } from '../../../lib/axios';
import { firebaseAuth } from '../../../lib/firebase';
import { firebaseStorage } from '../../../lib/firebase/storage';
import {
  User_UpdateUser_Body,
  User_UpdateUser_Return,
} from '../../../pages/api/user/updateUser';
import { UserProfileFormValues } from '../types';

export class UserProfileApi {
  static async uploadAvatar(file: File | Blob): Promise<UploadResult> {
    const currentUser = UserProfileApi.#getDefinedCurrentUser();
    const avatarRef = UserProfileApi.#getStoragePathToAvatar(currentUser.uid);
    return uploadBytes(avatarRef, file);
  }

  static async updateProfile(profile: Partial<UserProfileFormValues>) {
    const currentUser = UserProfileApi.#getDefinedCurrentUser();

    let avatarPath: string | undefined;

    if (profile.avatar) {
      const uploadResult = await UserProfileApi.uploadAvatar(profile.avatar);
      avatarPath = uploadResult.metadata.fullPath;
    }

    const body: User_UpdateUser_Body = {
      data: {
        photoUrl: avatarPath,
        displayName: profile.displayName,
      },
      uid: currentUser.uid,
    };

    await axios.post<User_UpdateUser_Return>('/user/updateUser', body);
  }

  static getUserAbsolutePhotoUrl() {
    const { currentUser } = firebaseAuth;
    if (!currentUser) throw new ToastException('Fail to get user photo');
    if (!currentUser.photoURL) return;
    const photoRef = UserProfileApi.#getStorageRef(currentUser.photoURL);
    return getDownloadURL(photoRef);
  }

  static #getDefinedCurrentUser(): User {
    const { currentUser } = firebaseAuth;
    if (!currentUser)
      throw new ToastException('Fail to update avatar. Try login in again');
    return currentUser;
  }

  //#region Helpers
  static #getStoragePathToAvatar(userId: string) {
    return UserProfileApi.#getStorageRef(`${userId}/images/avatar`);
  }

  static #getStorageRef = (path: string) => ref(firebaseStorage, path);

  //#endregion
}
