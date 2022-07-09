import { axios } from '../../../lib/axios';
import { MutationConfig, useTypedMutation } from '../../../lib/react-query';
import { CheckoutSessions_PromoteListing } from '../../../pages/api/checkout_sessions/promoteListing';

const stripePromotion = async (
  body: CheckoutSessions_PromoteListing['input']
) => {
  const { data } = await axios.post<CheckoutSessions_PromoteListing['return']>(
    '/checkout_sessions/promoteListing',
    body
  );
  return data.data;
};

export interface UseStripeListingPromotionOptions {
  config?: MutationConfig<typeof stripePromotion>;
}

export const useStripeListingPromotion = (
  props: UseStripeListingPromotionOptions = {}
) => {
  return useTypedMutation<typeof stripePromotion>({
    ...props.config,
    mutationFn: stripePromotion,
  });
};
