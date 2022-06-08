import { useUserAbsolutePhotoUrlQuery } from './useAbsoluteUserPhotoUrlQuery';

export const useUserAvatar = (uid: string) => {
  const userAbsolutePhotoUrlQuery = useUserAbsolutePhotoUrlQuery(uid);

  return { userAbsolutePhotoUrlQuery };
};
