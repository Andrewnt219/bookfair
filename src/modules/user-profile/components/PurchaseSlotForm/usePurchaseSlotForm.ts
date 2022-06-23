import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useToastStore } from '../../../../stores';
import { usePurchaseSlot } from '../../api/usePurchaseSlot';
import {
  PurchaseSlotSchema,
  purchaseSlotSchema,
} from '../../types/purchase-slot-schema';

const useRHF = () => {
  return useForm<PurchaseSlotSchema>({
    resolver: zodResolver(purchaseSlotSchema),
    defaultValues: {
      quantity: 1,
    },
  });
};

export const usePurchaseSlotForm = () => {
  const router = useRouter();
  const toastStore = useToastStore();
  const form = useRHF();
  const purchaseSlotMutation = usePurchaseSlot({
    config: {
      onSuccess() {
        toastStore.success('Purchase successfully');
        router.push('/user/listings');
      },
      onError(error) {
        toastStore.error(error);
      },
    },
  });
  return { form, purchaseSlotMutation };
};
