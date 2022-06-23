import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { EditListingFormProps } from '.';
import { useToastStore } from '../../../../stores';
import {
  useListingPhotoSources,
  useUpdateListing,
  UseUpdateListingOptions,
} from '../../api';
import {
  UpdateListingSchema,
  updateListingSchema,
} from '../../types/update-listing-schema';

export const useEditListingForm = ({ listing }: EditListingFormProps) => {
  const toastStore = useToastStore();

  const photosQuery = useListingPhotoSources({ photos: listing.photos });

  const form = useForm<UpdateListingSchema>({
    resolver: zodResolver(updateListingSchema),
    defaultValues: {
      description: listing.description,
      id: listing.id,
      photos: null,
      price: listing.price,
      title: listing.title,
    },
  });

  const config: UseUpdateListingOptions['config'] = {
    onSuccess() {
      toastStore.success('Listing is updated');
    },
    onError(error) {
      toastStore.error(error);
    },
  };
  const updateListingMutation = useUpdateListing({
    config,
  });

  return { photosQuery, form, updateListingMutation };
};
