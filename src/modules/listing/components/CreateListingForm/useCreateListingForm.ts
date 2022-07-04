import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useForm as useRHF } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { firebaseAuth } from '../../../../lib/firebase';
import { useToastStore } from '../../../../stores';
import { useCreateListing } from '../../api';
import {
  CreateListingSchema,
  createListingSchema,
} from '../../types/create-listing-schema';

const useForm = () => {
  return useRHF<CreateListingSchema>({
    resolver: zodResolver(createListingSchema),
    defaultValues: {
      description: '',
      photos: null,
      price: 0,
      title: '',
      course: '',
      tags: '',
    },
  });
};

export const useCreateListingForm = () => {
  const toastStore = useToastStore();
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm();
  const submitMutation = useCreateListing({
    config: {
      async onSuccess() {
        toastStore.success('Listing created');
        queryClient.invalidateQueries([
          'listings',
          firebaseAuth.currentUser?.uid,
        ]);
        router.push('/user/listings');
      },
      onError(error) {
        // TODO delete uploaded photos on error
        toastStore.error(error);
      },
    },
  });

  return { form, submitMutation };
};
