import { ref, uploadBytes } from 'firebase/storage';
import { nanoid } from 'nanoid';
import { useQueryClient } from 'react-query';
import { axios } from '../../../lib/axios';
import { firebaseAuth } from '../../../lib/firebase';
import { firebaseStorage } from '../../../lib/firebase/storage';
import { MutationConfig, useTypedMutation } from '../../../lib/react-query';
import { Listing_CreateOne } from '../../../pages/api/listing/createOne';
import { useToastStore } from '../../../stores';
import { DbListing } from '../types';
import { CreateListingSchema } from '../types/create-listing-schema';

const createListing = async ({
  photos,
  ...formData
}: CreateListingSchema): Promise<DbListing> => {
  const photoPaths: string[] = [];
  if (photos) {
    const uploadResults = await uploadPhotos(photos);
    const paths = uploadResults.map((result) => result.metadata.fullPath);
    photoPaths.push(...paths);
  }

  const body: Listing_CreateOne['input'] = {
    ...formData,
    photoPaths,
  };
  const { data } = await axios.post<Listing_CreateOne['return']>(
    '/listing/createOne',
    body
  );
  return data.data;
};

const uploadPhotos = (files: FileList) => {
  return Promise.all(
    Array.from(files).map(function uploadFile(file) {
      return uploadBytes(
        ref(firebaseStorage, `images/listings/${nanoid()}`),
        file
      );
    })
  );
};

export interface UseCreateListingConfig {
  config?: MutationConfig<typeof createListing>;
}

export const useCreateListing = ({ config }: UseCreateListingConfig = {}) => {
  const toastStore = useToastStore();
  const queryClient = useQueryClient();

  return useTypedMutation<typeof createListing>({
    ...config,
    mutationFn: createListing,
    async onSuccess() {
      toastStore.success('Listing created');
      queryClient.invalidateQueries([
        'listings',
        firebaseAuth.currentUser?.uid,
      ]);
    },
    onError(error) {
      toastStore.error(error);
    },
  });
};
