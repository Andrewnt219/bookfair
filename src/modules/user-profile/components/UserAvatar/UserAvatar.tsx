import React from 'react';
import { Image } from 'react-bootstrap';
import { useUserAvatar } from './useUserAvatar';

export const UserAvatar = () => {
  const { userAbsolutePhotoUrlQuery } = useUserAvatar();

  return (
    <div className="text-center">
      {userAbsolutePhotoUrlQuery.data && (
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
      )}
    </div>
  );
};
