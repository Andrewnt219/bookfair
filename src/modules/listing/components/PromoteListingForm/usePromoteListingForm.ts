import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { firebaseAuth } from '../../../../lib/firebase';
import { getStripe } from '../../../../lib/stripe';
import { useToastStore } from '../../../../stores';
import { useStripeListingPromotion } from '../../api';
import { promoteListingSchema, PromoteListingSchema } from '../../types';

const useRHF = (listingId: string) => {
  return useForm<PromoteListingSchema>({
    resolver: zodResolver(promoteListingSchema),
    defaultValues: {
      days: 0,
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
  const stripeCheckoutMutation = useStripeListingPromotion({
    config: {
      async onSuccess(checkoutSession) {
        const stripe = await getStripe();
        await stripe.redirectToCheckout({ sessionId: checkoutSession.id });
        toastStore.success('Listing is promoted');
        qc.invalidateQueries(['listings', firebaseAuth.currentUser?.uid]);
      },
      onError(error) {
        toastStore.error(error);
      },
    },
  });

  return { form, stripeCheckoutMutation };
};
