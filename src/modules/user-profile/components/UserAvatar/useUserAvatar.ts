import { useUserAbsolutePhotoUrlQuery } from './useAbsoluteUserPhotoUrlQuery';

export const useUserAvatar = () => {
  const userAbsolutePhotoUrlQuery = useUserAbsolutePhotoUrlQuery();

  return { userAbsolutePhotoUrlQuery };
};
