import { getDownloadURL, ref } from 'firebase/storage';
import { firebaseStorage } from '../../../lib/firebase/storage';
import { QueryConfig, useTypedQuery } from '../../../lib/react-query';
import { DbListingPhoto } from '../types';

const getPhotoSources = (paths: string[]): Promise<string[]> => {
  return Promise.all(
    paths.map((path) => getDownloadURL(ref(firebaseStorage, path)))
  );
};

export interface UseListingPhotoSourcesConfig {
  config?: QueryConfig<typeof getPhotoSources>;
  photos: DbListingPhoto[];
}

export const useListingPhotoSources = ({
  config,
  photos,
}: UseListingPhotoSourcesConfig) => {
  const listingId = photos[0]?.listingId;
  const paths = photos.map((photo) => photo.mediaUrl);

  return useTypedQuery<typeof getPhotoSources>({
    ...config,
    // Only run when listingId exists
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryKey: ['listing-photos', listingId!],
    queryFn: () => getPhotoSources(paths),
    enabled: Boolean(listingId),
  });
};
