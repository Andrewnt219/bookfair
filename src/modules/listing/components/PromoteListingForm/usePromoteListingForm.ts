import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useToastStore } from '../../../../stores';
import { usePromoteListing } from '../../api';
import { promoteListingSchema, PromoteListingSchema } from '../../types';

const useRHF = (listingId: string) => {
  return useForm<PromoteListingSchema>({
    resolver: zodResolver(promoteListingSchema),
    defaultValues: {
      days: 1,
      listingId,
    },
  });
};

export interface UsePromoteListingFormProps {
  listingId: string;
}

export const usePromoteListingForm = ({
  listingId,
}: UsePromoteListingFormProps) => {
  const qc = useQueryClient();
  const toastStore = useToastStore();
  const form = useRHF(listingId);
  const promoteListingMutation = usePromoteListing({
    config: {
      onSuccess() {
        toastStore.success('Listing is promoted');
        qc.invalidateQueries(['listings'], listingId);
      },
      onError(error) {
        toastStore.error(error);
      },
    },
  });

  return { form, promoteListingMutation };
};
