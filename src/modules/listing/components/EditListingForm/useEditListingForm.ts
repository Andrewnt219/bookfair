import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { EditListingFormProps } from '.';
import { useToastStore } from '../../../../stores';
import { useListingPhotoSources, useUpdateListing } from '../../api';
import {
  UpdateListingSchema,
  updateListingSchema,
} from '../../types/update-listing-schema';

export const useEditListingForm = ({ listing }: EditListingFormProps) => {
  const toastStore = useToastStore();
  const router = useRouter();
  const qc = useQueryClient();

  const photosQuery = useListingPhotoSources({ photos: listing.photos });

  const form = useForm<UpdateListingSchema>({
    resolver: zodResolver(updateListingSchema),
    defaultValues: {
      description: listing.description,
      id: listing.id,
      photos: null,
      price: listing.price,
      title: listing.title,
      course: listing.course,
      tags: listing.tags.join(', '),
    },
  });

  const updateListingMutation = useUpdateListing({
    config: {
      onSuccess() {
        toastStore.success('Listing is updated');
        router.push('/user/listings');
        qc.invalidateQueries(['listing', listing.id]);
      },
      onError(error) {
        toastStore.error(error);
      },
    },
  });

  return { photosQuery, form, updateListingMutation };
};
