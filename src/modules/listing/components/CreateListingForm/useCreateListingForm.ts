import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useRHF } from 'react-hook-form';
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
    },
  });
};

export const useCreateListingForm = () => {
  const form = useForm();
  const submitMutation = useCreateListing();

  return { form, submitMutation };
};
