import { axios } from '../../../lib/axios';
import { MutationConfig, useTypedMutation } from '../../../lib/react-query';
import { CheckoutSessions_PurchaseListing } from '../../../pages/api/checkout_sessions/purchaseListing';

const purchaseSlot = async (
  body: CheckoutSessions_PurchaseListing['input']
) => {
  const { data } = await axios.post<CheckoutSessions_PurchaseListing['return']>(
    '/checkout_sessions/purchaseListing',
    body
  );
  return data.data;
};

export interface UsePurchaseSlotOptions {
  config?: MutationConfig<typeof purchaseSlot>;
}

export const usePurchaseSlot = ({ config }: UsePurchaseSlotOptions = {}) => {
  return useTypedMutation<typeof purchaseSlot>({
    ...config,
    mutationFn: purchaseSlot,
  });
};
