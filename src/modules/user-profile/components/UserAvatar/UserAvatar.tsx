import { Icon } from '@iconify/react';
import React from 'react';
import { Image } from 'react-bootstrap';
import { useUserAvatar } from './useUserAvatar';

export interface UserAvatarProps {
  uid: string;
}
export const UserAvatar = ({ uid }: UserAvatarProps) => {
  const { userAbsolutePhotoUrlQuery } = useUserAvatar(uid);

  return (
    <div className="text-center">
      {userAbsolutePhotoUrlQuery.data ? (
        <Image
          roundedCircle
          src={userAbsolutePhotoUrlQuery.data}
          alt=""
          className="h-100 w-50"
          style={{
            aspectRatio: '1 / 1',
            objectFit: 'cover',
          }}
        />
      ) : (
        <Icon
          icon="bi:person-fill"
          className="w-50 h-50 rounded-circle bg-white text-black"
        />
      )}
    </div>
  );
};
