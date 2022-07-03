import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useToastStore } from '../../../../stores';
import { useSearchListings } from '../../api';
import { searchListingSchema, SearchListingSchema } from '../../types';

const useRHF = () => {
  return useForm<SearchListingSchema>({
    resolver: zodResolver(searchListingSchema),
    defaultValues: {
      search: '',
    },
  });
};
export const useSearchListingForm = () => {
  const toastStore = useToastStore();
  const client = useQueryClient();

  const form = useRHF();
  const searchListingsMutation = useSearchListings({
    config: {
      onSuccess(data) {
        client.setQueryData(['search-listings'], data);
      },
      onError(error) {
        toastStore.error(error);
      },
    },
  });

  return { form, searchListingsMutation };
};
