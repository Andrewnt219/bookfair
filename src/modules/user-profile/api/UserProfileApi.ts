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
  User_GetOne_Query,
  User_GetOne_Return,
} from '../../../pages/api/user/getOne';
import {
  User_UpdateUser_Body,
  User_UpdateUser_Return,
} from '../../../pages/api/user/updateUser';
import { DbUser, UserProfileFormValues } from '../types';

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
        bio: profile.bio,
      },
      uid: currentUser.uid,
    };

    await axios.patch<User_UpdateUser_Return>('/user/updateUser', body);
  }

  static getUserAbsolutePhotoUrl(storageUrl: string) {
    const photoRef = UserProfileApi.#getStorageRef(storageUrl);
    return getDownloadURL(photoRef);
  }

  static async getUserById(params: User_GetOne_Query): Promise<DbUser | null> {
    const { data } = await axios.get<User_GetOne_Return>('/user/getOne', {
      params,
    });
    return data.data;
  }

  static async deleteCurrentUser() {
    return axios.delete<User_GetOne_Return>('/user/deleteOne');
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
