import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { getStripe } from '../../../../lib/stripe';
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
  const toastStore = useToastStore();
  const form = useRHF();
  const purchaseSlotMutation = usePurchaseSlot({
    config: {
      async onSuccess(checkoutSession) {
        const stripe = await getStripe();
        await stripe.redirectToCheckout({ sessionId: checkoutSession.id });
        toastStore.success('Purchase successfully');
      },
      onError(error) {
        toastStore.error(error);
      },
    },
  });
  return { form, purchaseSlotMutation };
};
