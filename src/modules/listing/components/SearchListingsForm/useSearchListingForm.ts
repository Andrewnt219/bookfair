import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useAuthUserStore, useToastStore } from '../../../../stores';
import { useCreateAlert } from '../../../alert';
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
  const { authUser } = useAuthUserStore();

  const form = useRHF();
  const searchListingsMutation = useSearchListings({
    config: {
      onSuccess(data) {
        if (data.length === 0) {
          toastStore.enqueue({ message: 'No results', variant: 'warning' });
        }
        client.setQueryData(['search-listings'], data);
      },
      onError(error) {
        toastStore.error(error);
      },
    },
  });

  const createAlertMutation = useCreateAlert({
    config: {
      onSuccess() {
        toastStore.success('Alert created');
      },
      onError(error) {
        toastStore.error(error);
      },
    },
  });

  return { form, searchListingsMutation, createAlertMutation, authUser };
};
